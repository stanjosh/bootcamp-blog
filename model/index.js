const User = require('./User');
const Comment = require('./Comment');
const BlogPost = require('./BlogPost');


User.hasMany(BlogPost);
User.hasMany(Comment);
BlogPost.belongsTo(User, {
  foreignKey: 'user_id',
});
BlogPost.hasMany(Comment);
Comment.belongsTo(User, {
  foreignKey: 'user_id',
});
Comment.hasOne(BlogPost);


module.exports = {
  User,
  Comment,
  BlogPost
};

const db = {
  getAllComments: async () => {
    return await Comment.findAll({
      include: [{ 
        model: User,
        attributes: ["id", "author_name"],
        as: "user",
       }],
      order: [["comment_time", "DESC"]]
    });
  },

  getComment: async (id) => {
    return await Comment.findByPk(id, {
      include: [
        { model: User, 
          attributes: ["id", "author_name"], 
          as: "user" },
      ]
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
        { model: User, 
          attributes: ["id", "author_name"], 
          as: "user" },
        {
          model: Comment,
          include: {
            model: User,
            attributes: ["id", "author_name"],
            as: "user",
          },
        },
      ],
      order: [["post_time", "DESC"]]
    })
    .then((blogs) => {
      return blogs.map((blog) => {
        return blog.get({plain: true})
      })
    });
  },

  getBlogPost: async (id) => {
    return await BlogPost.findByPk(id, {
      include: [
        { model: User, attributes: ["id", "author_name"], as: "user" },
        {
          model: Comment,
          include: [{ 
            model: User, 
            attributes: ["id", "author_name"], 
            as: "user" 
            },
          ]
        },
      ],
    });
  },

  createBlogPost: async (blogPost) => {
    await BlogPost.create(blogPost);
  },

  updateBlogPost: async (id, blogPost) => {
    return await BlogPost.update(blogPost, { where: { id: id } });
  },

  deleteBlogPost: async (id) => {
    return await BlogPost.destroy({ where: { id: id } });
  },

  getAllUsers: async () => {
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

  updateUser: async (id, info) => {
    return await User.update(info, { where: { id: id }, individualHooks: true })
    .catch((err) => {
      console.log(err)
      return false 
    });
  },

  authUser: async (user) => {
    console.log(user)
    let password = user.password;
    let authUser = await User.findOne({
      where: { email: user.email }
    })
    if (authUser) {
    return authUser.authenticate(password) ? authUser.toJSON() : false;
    } else {
      return false;
    }
  },
}

module.exports = { db, User, Comment, BlogPost };
