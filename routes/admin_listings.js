var express = require('express');
var router = express.Router();
const Listing = require('../models/Listing');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const user = req.user;
  const listings = await Listing.findAll();
  res.render('admin_listings', {listings, user});
});

router.get("/delete/:listingid", async function(req, res, next) {
  const listing = await Listing.findListing(req.params.listingid)
  if (listing) {
    await listing.destroy()
    res.redirect('/admin_listings/?msg=successdel&?listingid='+req.params.listingid)
  } else {
    res.redirect('/admin_listings/?msg=listing+not+found&?listingid='+req.params.listingid)
  }
});

module.exports = router;