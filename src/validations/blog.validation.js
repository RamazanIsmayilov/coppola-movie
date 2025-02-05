const { z } = require("zod");

const createBlog = z.object({
  title: z.string().trim(),
  slug: z.string().trim().optional(),
  image: z.any(),
  category: z.string(),
  content: z.string(),
});

const updateBlog = z.object({
  title: z.string().trim().optional(),
  slug: z.string().trim().optional(),
  image: z.any().optional(),
  category: z.string().optional(),
  content: z.string().optional(),
});

const blogValidation = {
  createBlog,
  updateBlog,
};

module.exports = blogValidation;
