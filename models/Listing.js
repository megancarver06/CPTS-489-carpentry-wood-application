const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')

class Listing extends Model {
  
    static async findListing(id) {
        try {
            const listing = await Listing.findByPk(id)
            return listing ? listing : null;
        } catch(error) {
            console.log(error)
            return null
        }
    }
}

Listing.init({
  image1: {
    type: DataTypes.BLOB,
    allowNull: false
  },
  image2: {
    type: DataTypes.BLOB,
    allowNull: false
  },
  image3: {
    type: DataTypes.BLOB,
    allowNull: false
  },
  image4: {
    type: DataTypes.BLOB,
    allowNull: false
  },
  listingtitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  listingprice: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  listingdesc: {
    type: DataTypes.STRING,
    allowNull: false
  },
  listingwidth: {
    type: DataTypes.STRING,
    allowNull: false
  },
  listingheight: {
    type: DataTypes.STRING,
    allowNull: false
  },
  listingdepth: {
    type: DataTypes.STRING,
    allowNull: false
  },
  listingseller: {
    type: DataTypes.STRING,
    allowNull: false
  },
  spacecategory: {
    type: DataTypes.STRING,
    allowNull: false
  },
  productcategory: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Listing'
});

module.exports = Listing