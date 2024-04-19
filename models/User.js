const { STRING } = require('mysql/lib/protocol/constants/types')
const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')

class User extends Model {
    static async findUser(username, password) {
        try {
            const user = await User.findByPk(username)
            if(user && user.password === password) {
                return user
            } else {
                return null
            }
        } catch(error) {
            console.log(error)
            return null
        }
    }

    static async getUser(username) {
        try {
            const user = await User.findByPk(username)
            return user ? user : null;
        } catch(error) {
            console.log(error)
            return null
        }
    }
}

User.init({
  // Model attributes are defined here
  username: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  salt: {
    type: DataTypes.STRING,
    allowNull: true
  },
  usertype: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  shopname : {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  shopdesc : {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'User'
});

module.exports = User