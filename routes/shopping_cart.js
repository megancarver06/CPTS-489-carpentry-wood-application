var express = require('express');
const { findListing } = require('../models/Listing');
var router = express.Router();
const Listing = require('../models/Listing');
const User = require('../models/User');

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    const user = await User.getUser(req.user.username);
    let stringcart = user.cart;
    let cart = [];
    if (stringcart) {
      cart = stringcart.split(',');
    }
    console.log("Spliced cart is ", cart);

    const listings = await Listing.findAll({
      where: {
        id: cart
      }
    });

    // Calculate total price
    let totalPrice = 0;
    for (let listing of listings) {
      console.log("Listing: ", listing)
      console.log("Listing price: ", listing.listingprice)
      console.log("Listing price type: ", typeof listing.listingprice)

      // Get the quantity of the listing from the cart
      const quantity = cart.filter(item => item === listing.id.toString()).length;

      // Remove the dollar sign and convert the listing price string to a floating-point number
      let price = parseFloat(listing.listingprice.replace('$', ''));

      console.log("Price: ", price)

      // Add the price multiplied by the quantity to the total
      totalPrice += price * quantity;
    }

    console.log("Total price: ", totalPrice);


    // Render the shopping cart page with the total
    res.render('shopping_cart', { listings, user: user, total: totalPrice.toFixed(2) });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
