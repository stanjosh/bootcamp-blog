// import models
const { Model } = require('sequelize');
const User = require('./User');
const Comment = require('./Comment');
const BlogPost = require('./BlogPost');


User.hasMany(BlogPost);

User.hasMany(Comment);

BlogPost.hasMany(Comment);

BlogPost.belongsTo(User);

Comment.belongsTo(User);

Comment.belongsTo(BlogPost);



module.exports = {
  User,
  Comment,
  BlogPost
};
