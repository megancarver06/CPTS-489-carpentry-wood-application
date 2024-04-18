const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')

class Seller extends Model {
    static async findSeller(username, password) {
        try {
            const seller = await Seller.findByPk(username)
            if(seller && seller.password === password) {
                return seller
            } else {
                return null
            }
        } catch(error) {
            console.log(error)
            return null
        }
    }
}

Seller.init({
  // Model attributes are defined here
  storename: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
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
  modelName: 'Seller'
});

module.exports = Seller