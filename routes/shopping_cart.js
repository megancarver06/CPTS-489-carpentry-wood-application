var express = require('express');
const { findListing } = require('../models/Listing');
var router = express.Router();
const Listing = require('../models/Listing');
const User = require('../models/User');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const user = await User.getUser(req.user.username)
  let stringcart = user.cart;

  const cart = stringcart.split(',');
  console.log("Spliced cart is ", cart)


  const listings = await Listing.findAll({
    where: {
      listingid: cart
    }
  });

  res.render('shopping_cart', {listings, user: user});
});

module.exports = router;