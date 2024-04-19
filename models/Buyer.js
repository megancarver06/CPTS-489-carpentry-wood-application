const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')

class Buyer extends Model {
    static async findBuyer(username, password) {
        try {
            const buyer = await Buyer.findByPk(username)
            if(buyer && buyer.password === password) {
                return buyer
            } else {
                return null
            }
        } catch(error) {
            console.log(error)
            return null
        }
    }
    
    static async getBuyer(username) {
      try {
          const buyer = await Buyer.findByPk(username)
          return buyer ? buyer : null;
      } catch(error) {
          console.log(error)
          return null
      }
  }
}

Buyer.init({
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
  modelName: 'Buyer'
});

module.exports = Buyer