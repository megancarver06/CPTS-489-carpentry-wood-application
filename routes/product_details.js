var express = require('express');
var router = express.Router();
const Listing = require('../models/Listing');
const User = require('../models/User');

/* GET home page. */
router.get('/:listingid', async function(req, res, next) {
  const user = req.user;
  const listing = await Listing.findListing(req.params.listingid)
  res.render('product_details', {listing, user});
});

router.post('/addtocart/:listingid', async function(req, res, next) {
  const user = await User.getUser(req.user.username)
  let cart = user.cart;
  if (cart!==null) {
    cart = cart + "," + req.params.listingid;
  } else {
    cart = req.params.listingid;
  }

  console.log("Cart being pushed is: ", cart)

  user.cart = cart;

  await user.update({cart: cart});

  res.redirect('/shopping_cart');
});

module.exports = router;