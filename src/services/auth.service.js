const User = require("../models/User.model");
const { NotFoundError, ConflictError } = require("../utils/error.utils");
const { encodePayload } = require("../utils/jwt.utils");
const bcrypt = require("bcrypt");
const renderTemplate = require("../utils/template.utils");
const sendMail = require("../utils/mail.utils");
const config = require("../config");

const login = async (params) => {
  const user = await User.findOne({
    $or: [
      { email: params.emailOrUsername },
      { username: params.emailOrUsername },
    ],
  }).lean();
  if (!user) {
    throw new NotFoundError("Email, username or password is incorrect.");
  }

  const isPasswordValid = await bcrypt.compare(params.password, user.password);
  if (!isPasswordValid) {
    console.log("Password validation failed");
    throw new NotFoundError("Email, username or password is wrong");
  }
  const token = encodePayload({ userId: user._id });

  return {
    message: "Login is successfully",
    token,
    user: {
      ...user,
      password: undefined,
      location: undefined,
      phone: undefined,
      gender: undefined,
      avatar: user.avatar || null,
    },
  };
};

const register = async (params) => {
  const { username, email, password } = params;
  if (!username || !email || !password) {
    throw new Error("Username, email, and password are required.");
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (existingUser) {
    throw new ConflictError(`This email or username already exists.`);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ ...params, password: hashedPassword });

  const mailContent = await renderTemplate("welcome-mail", {
    user: user.toJSON(),
    activationLink: "http://localhost.com",
    supportLink: "mailto:support@example.com",
  });

  await sendMail(
    config.smtp.from,
    user.email,
    "Welcome to our website",
    mailContent
  );

  await user.save();

  return {
    message: "User created successfully",
    user,
  };
};

const authService = {
  login,
  register,
};

module.exports = authService;
