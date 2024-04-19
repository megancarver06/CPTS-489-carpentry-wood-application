var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup');
});

router.post('/', async function(req, res, next) {
  const { username, password, email, type } = req.body;
  if(type === 'buyer') {
    const Buyer = require('../models/Buyer');
    const buyer = await Buyer.create({ username, password, email });
    if(buyer) {
      res.redirect('/signin');
    } else {
      res.redirect('/signup');
    }
  } else if(type === 'seller') {
    const Seller = require('../models/Seller');
    const seller = await Seller.create({ username, password, email });
    if(seller) {
      res.redirect('/signin');
    } else {
      res.redirect('/signup');
    }
  } else if(type === 'admin') {
    const Admin = require('../models/Admin');
    const admin = await Admin.create({ username, password, email });
    if(admin) {
      res.redirect('/signin');
    } else {
      res.redirect('/signup');
    }
  } else {
    res.redirect('/signup');
  }
});

module.exports = router;