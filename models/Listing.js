const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')

class Listing extends Model {
    static async findListing(listingid) {
        try {
            const listing = await Listing.findByPk(listingid)
            return listing ? listing : null;
        } catch(error) {
            console.log(error)
            return null
        }
    }
}

Listing.init({
  listingid: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  coursename: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image1: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image2: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image3: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image4: {
    type: DataTypes.STRING,
    allowNull: false
  },
  listingtitle: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  listingprice: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  listingdesc: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  listingwidth: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  listingheight: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  listingdepth: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  listingseller: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Listing'
});

module.exports = Listing