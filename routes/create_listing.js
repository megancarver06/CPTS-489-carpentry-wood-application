var express = require('express');
var router = express.Router();
const Listing = require('../models/Listing');
const User = require('../models/User');


router.get('/', function(req, res, next) {
    const user = req.user;
    res.render('create_listing', { user: user });
});

router.post("/create", async function (req, res, next) {
    const user = await User.getUser(req.user.username)
    let shopname = user.shopname;
    try {
      await Listing.create({
        listingtitle: req.body.listingtitle,
        listingprice: req.body.listingprice,
        listingdesc: req.body.listingdesc,
        listingwidth: req.body.listingwidth,
        listingheight: req.body.listingheight,
        listingdepth: req.body.listingdepth,
        spacecategory: req.body.spacecategory,
        productcategory: req.body.productcategory,
        image1: "/",
        image2: "/",
        image3: "/",
        image4: "/",
        listingseller: shopname
      });
      res.redirect("/shop_inventory?msg=success&listingtitle=" + req.body.listingtitle);
    } catch (error) {
      res.redirect(
        "/shop_inventory?msg=" +
          new URLSearchParams(error.toString()).toString() +
          "&listingtitle" +
          req.body.listingtitle
      );
    }
});

module.exports = router;