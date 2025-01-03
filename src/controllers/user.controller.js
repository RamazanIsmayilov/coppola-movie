const userService = require("../services/user.service");

const list = async (req, res, next) => {
  try {
    let users = await userService.list();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const result = await userService.resetPassword(req.user._id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const forgetPassword = async (req, res, next) => {
  try {
    let result = await userService.forgetPassword(req.body.email);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const confirmPassword = async (req, res, next) => {
  try {
    let result = await userService.confirmPassword(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const userController = {
  list,
  resetPassword,
  forgetPassword,
  confirmPassword,
};

module.exports = userController;
