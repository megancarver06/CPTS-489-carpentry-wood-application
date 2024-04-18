const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database/thewoodworksdb1.sqlite'
})

module.exports = sequelize