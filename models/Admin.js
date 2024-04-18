const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')

class Admin extends Model {
    static async findAdmin(username, password) {
        try {
            const admin = await Admin.findByPk(username)
            if(admin && admin.password === password) {
                return admin
            } else {
                return null
            }
        } catch(error) {
            console.log(error)
            return null
        }
    }
}

Admin.init({
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
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Admin'
});

module.exports = Admin