var express = require('express');
var router = express.Router();
const User = require('../models/User');
const Orders = require('../models/Orders');
const Listing = require('../models/Listing');

/* GET orders page for the shop. */
router.get('/', async function(req, res, next) {
  const user = await User.getUser(req.user.username);
  let shopname = user.username
  const orders = await Orders.findAll({
    where: {
      soldby: shopname
    }
  });
  res.render('shop_orders', { orders, user });
});

router.post("/print_invoice/:id", async function(req, res, next) {
  const order = await Orders.findByOrderNumber(req.params.id)
  const listing = await Listing.findListing(order.listingid)
  
  res.render('invoice', {order, listing});

});
module.exports = router;