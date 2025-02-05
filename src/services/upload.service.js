const Upload = require("../models/Upload.model");
const { NotFoundError } = require("../utils/error.utils");
const path = require("path");
const fs = require("fs/promises");

const addImage = async (file) => {
  const image = new Upload({
    url: `/uploads/${file.filename}`,
  });
  await image.save();
  return image;
};


const deleteImage = async (id) => {
  const image = await Upload.findById(id);
  if (!image) throw new NotFoundError("Image is not found");

  const filePath = path.join(
    __dirname,
    "../../uploads",
    path.basename(image.url)
  );
  await fs.unlink(filePath);

  const deletedImage = await Upload.findByIdAndDelete(id);
  return {
    message: "Image deleted successfully",
    deletedImage,
  };
};

const uploadService = {
  addImage,
  deleteImage,
};

module.exports = uploadService;
