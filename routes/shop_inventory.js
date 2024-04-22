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
  res.render('shop_inventory', { listings, user });
});


router.get("/delete/:id", async function(req, res, next) {
  const listing = await Listing.findListing(req.params.id)
  if (listing) {
    await listing.destroy()
    res.redirect('/shop_inventory/?msg=successdel&?id='+req.params.id)
  } else {
    res.redirect('/shop_inventory/?msg=listing+not+found&?id='+req.params.id)
  }
});
module.exports = router;