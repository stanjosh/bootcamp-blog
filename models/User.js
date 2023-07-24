const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const useBcrypt = require('sequelize-bcrypt');
class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    author_name:{
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        isEmail: true
      }
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);
  
useBcrypt(User)

module.exports = User;
