var express = require('express');
var router = express.Router();
const User = require('../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  const user = req.user;
  shopname = user.shopname;
  res.render('seller_storefront_info', { user: user, shopname } );
});

module.exports = router;