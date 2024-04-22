var express = require('express');
var router = express.Router();
const Listing = require('../models/Listing');
const User = require('../models/User');
const Orders = require('../models/Orders');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const user = await User.getUser(req.user.username)
  let shopname = user.shopname;
  const listings = await Listing.findAll({
    where: {
      listingseller: shopname
    }
  });
  const orders = await Orders.findAll({
    where: {
      purchasedby: user.username
    }
  });
  res.render('profile', { listings, user, orders });
});

module.exports = router;