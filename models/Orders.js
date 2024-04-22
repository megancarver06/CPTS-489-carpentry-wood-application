const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')

class Orders extends Model {
  static async findOrders() {
      try {
          const orders = await Orders.findAll();
          return orders ? orders : [];
      } catch(error) {
          console.log(error);
          return [];
      }
  }

  static async findByOrderNumber(ordernum) {
    try {
        const order = await Orders.findByPk(ordernum)
        return order ? order : null;
    } catch(error) {
        console.log(error)
        return null
    }
}
}


Orders.init({
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