const blogService = require("../services/blog.service");

const addBlog = async (req, res, next) => {
  try {
    const newBlog = await blogService.addBlog(req.body);
    res.status(201).json(newBlog);
  } catch (error) {
    next(error);
  }
};

const allBlogs = async (req, res, next) => {
  try {
    const allBlogs = await blogService.allBlogs();
    res.json(allBlogs);
  } catch (error) {
    next(error);
  }
};

const singleBlog = async (req, res, next) => {
  try {
    const singleBlog = await blogService.singleBlog(req.params.id);
    res.json(singleBlog);
  } catch (error) {
    next(error);
  }
};

const updateBlog = () => {};
const deleteBlog = () => {};

const blogController = {
  addBlog,
  allBlogs,
  singleBlog,
  updateBlog,
  deleteBlog,
};

module.exports = blogController;
