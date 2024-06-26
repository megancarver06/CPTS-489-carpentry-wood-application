var express = require('express');
var router = express.Router();
const Listing = require('../models/Listing');
const User = require('../models/User');

/* GET home page. */
router.get('/:shopname', async function(req, res, next) {
  const user = await User.getUser(req.user.username)
  shopname = req.params.shopname;
  const listings = await Listing.findAll({
    where: {
      listingseller: shopname
    }
  });
  res.render('storefront_shop', { listings, user, shopname });
});

module.exports = router;