var express = require('express');
var router = express.Router();
const Listing = require('../models/Listing');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/index/livingroom/', async function(req, res, next) {
  const listings = await Listing.findAll({
    where: {
      spacecategory: "living room"
    }
  });
  res.render('shop_by_category', {listings});
});

router.get('/index/diningroom/', async function(req, res, next) {
  const listings = await Listing.findAll({
    where: {
      spacecategory: "dining room"
    }
  });
  res.render('shop_by_category', {listings});
});

router.get('/index/office/', async function(req, res, next) {
  const listings = await Listing.findAll({
    where: {
      spacecategory: "office"
    }
  });
  res.render('shop_by_category', {listings});
});

router.get('/index/bedroom/', async function(req, res, next) {
  const listings = await Listing.findAll({
    where: {
      spacecategory: "bedroom"
    }
  });
  res.render('shop_by_category', {listings});
});

router.get('/index/kitchen/', async function(req, res, next) {
  const listings = await Listing.findAll({
    where: {
      spacecategory: "kitchen"
    }
  });
  res.render('shop_by_category', {listings});
});

router.get('/index/outdoors/', async function(req, res, next) {
  const listings = await Listing.findAll({
    where: {
      spacecategory: "outdoors"
    }
  });
  res.render('shop_by_category', {listings});
});

router.get('/index/chairsandstools/', async function(req, res, next) {
  const listings = await Listing.findAll({
    where: {
      productcategory: "chairs and stools"
    }
  });
  res.render('shop_by_category', {listings});
});

router.get('/index/tablesanddesks/', async function(req, res, next) {
  const listings = await Listing.findAll({
    where: {
      productcategory: "tables and desks"
    }
  });
  res.render('shop_by_category', {listings});
});

router.get('/index/dressers/', async function(req, res, next) {
  const listings = await Listing.findAll({
    where: {
      productcategory: "dressers"
    }
  });
  res.render('shop_by_category', {listings});
});

router.get('/index/storageandorganization/', async function(req, res, next) {
  const listings = await Listing.findAll({
    where: {
      productcategory: "storage and organization"
    }
  });
  res.render('shop_by_category', {listings});
});

router.get('/index/signageanddecor/', async function(req, res, next) {
  const listings = await Listing.findAll({
    where: {
      productcategory: "signage and decor"
    }
  });
  res.render('shop_by_category', {listings});
});

router.get('/index/dishesandcuttingboards/', async function(req, res, next) {
  const listings = await Listing.findAll({
    where: {
      productcategory: "dishesandcuttingboards"
    }
  });
  res.render('shop_by_category', {listings});
});


module.exports = router;
