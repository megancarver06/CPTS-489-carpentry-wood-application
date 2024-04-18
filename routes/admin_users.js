var express = require('express');
var router = express.Router();
const Buyer = require('../models/Buyer');
const Seller = require('../models/Seller');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const buyers = await Buyer.findAll();
  const sellers = await Seller.findAll();
  res.render('admin_users', {buyers, sellers});
});

module.exports = router;