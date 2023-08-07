const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const User = require('./User');
const BlogPost = require('./BlogPost');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    user_id:{
      type: DataTypes.UUID,
      references: {
        model: User,
        key: 'id'
      },
      allowNull: false
    },
    blogpost_id:{
      type: DataTypes.UUID,
      references: {
        model: BlogPost,
        key: 'id'
      }
    },
    comment_content:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    comment_time:{
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
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
