const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const bcrypt = require('bcryptjs');
class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    author_name:{
      type: DataTypes.STRING,
      unique: true,
      defaultValue: "Anonymous author"
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
    },
    
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
    scopes: {
      withoutPassword: {
        attributes: { exclude: ['password', 'id'] },  //custom scope to ensure even a hashed password is not send to client
      }
    }
  }
);


//obviously hashing passwords
function hashPassword(user) {
  let password = user.password;
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
  user.password = hash;
  console.log('ran hashPassword')
}

//custom method for user class to authenticate
User.prototype.authenticate = function (password) {
  return bcrypt.compareSync(password, this.password);
};

User.beforeUpdate(hashPassword)
User.beforeCreate(hashPassword)

module.exports = User;
