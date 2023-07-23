const { User, BlogPost, Comment } = require("../models");
const bodyParser = require("body-parser");

const db = {
  getComments: async () => {
    return await Comment.findAll({
      include: [
        { model: User, attributes: ["id", "author_name"], as: "user" },
        { model: BlogPost },
      ],
    });
  },

  getComment: async (id) => {
    return await Comment.findByPk(id, {
      include: [
        { model: User, attributes: ["id", "author_name"], as: "user" },
        {
          model: BlogPost,
        },
      ],
    });
  },

  createComment: async (comment) => {
    return await Comment.create(comment);
  },

  updateComment: async (id, comment) => {
    return await Comment.update(comment, { where: { id: id } });
  },

  deleteComment: async (id) => {
    return await Comment.destroy({ where: { id: id } });
  },

  getBlogPosts: async () => {
    return await BlogPost.findAll({
      include: [
        { model: User, attributes: ["id", "author_name"], as: "user" },
        {
          model: Comment,
        },
      ],
    });
  },

  getBlogPost: async (id) => {
    return await BlogPost.findByPk(id, {
      include: [
        { model: User, attributes: ["id", "author_name"], as: "user" },
        {
          model: Comment,
        },
      ],
    });
  },

  createBlogPost: async (blogPost) => {
    return await BlogPost.create(blogPost);
  },

  updateBlogPost: async (id, blogPost) => {
    return await BlogPost.update(blogPost, { where: { id: id } });
  },

  deleteBlogPost: async (id) => {
    return await BlogPost.destroy({ where: { id: id } });
  },

  getUsers: async () => {
    return await User.findAll({
      include: [{ model: BlogPost }, { model: Comment }],
    });
  },

  getUser: async (id) => {
    return await User.findByPk(id, {
      include: [{ model: BlogPost }, { model: Comment }],
    });
  },

  createUser: async (user) => {
    return await User.create(user);
  },
};

module.exports = db;
