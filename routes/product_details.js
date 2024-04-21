var express = require('express');
var router = express.Router();
const Listing = require('../models/Listing');

/* GET home page. */
router.get('/:listingid', async function(req, res, next) {
  const user = req.user;
  const listing = await Listing.findListing(req.params.listingid)
  res.render('product_details', {listing, user});
});

module.exports = router;