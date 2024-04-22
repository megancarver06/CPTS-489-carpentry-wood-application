var express = require('express');
var router = express.Router();
const Listing = require('../models/Listing');

/* GET Shop Inventory page. */
router.get('/', async function(req, res, next) {
  const user = req.user;
  console.log(user)
  const listings = await Listing.findAll({
    where: {
      listingseller: user.username
    }
  });
  res.render('shop_inventory', { user, listings });
});

module.exports = router;