const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')

class Orders extends Model {
    static async findOrders(ordernum) {
        try {
            const order = await Orders.findByPk(ordernum)
            return order ? order : null;
        } catch(error) {
            console.log(error)
            return null
        }
    }
}

Listing.init({
  ordernum: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  purchasedby: {
    type: DataTypes.STRING,
    allowNull: false
  },
  soldby: {
    type: DataTypes.STRING,
    allowNull: false
  },
  listingid: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Orders'
});

module.exports = Orders