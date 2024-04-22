var express = require('express');
var router = express.Router();
const Listing = require('../models/Listing');
const User = require('../models/User');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const user = await User.getUser(req.user.username)
  let shopname = user.shopname;
  const listings = await Listing.findAll({
    where: {
      listingseller: shopname
    }
  });
  res.render('profile', { listings, user });
});

module.exports = router;