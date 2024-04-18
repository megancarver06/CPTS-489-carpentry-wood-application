var express = require('express');
var router = express.Router();
const Listing = require('../models/Listing');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const listings = await Listing.findAll();
  res.render('admin_listings', {listings});
});

module.exports = router;