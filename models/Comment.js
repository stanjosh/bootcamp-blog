const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');
const BlogPost = require('./BlogPost');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    user_id:{
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    blogpost_id:{
      type: DataTypes.INTEGER,
      references: {
        model: BlogPost,
        key: 'id'
      }
    },
    comment_content:{
      type: DataTypes.STRING,
      allowNull: false
    },
    comment_time:{
      type: DataTypes.DATE
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Comment;
