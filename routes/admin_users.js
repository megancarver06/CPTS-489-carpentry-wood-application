var express = require('express');
var router = express.Router();
const Buyer = require('../models/Buyer');
const Seller = require('../models/Seller');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const buyers = await Buyer.findAll();
  const sellers = await Seller.findAll();
  res.render('admin_users', {buyers, sellers});
});

router.get("/deletebuyer/:username", async function(req, res, next) {
  const buyer = await Buyer.getBuyer(req.params.username)
  if (buyer) {
    await buyer.destroy()
    res.redirect('/admin_users/?msg=successdel&?username='+req.params.username)
  } else {
    res.redirect('/admin_users/?msg=buyer+not+found&?username='+req.params.username)
  }
});

router.get("/deleteseller/:username", async function(req, res, next) {
  const seller = await Seller.getSeller(req.params.storename)
  if (seller) {
    await buyer.destroy()
    res.redirect('/admin_users/?msg=successdel&?storename='+req.params.username)
  } else {
    res.redirect('/admin_users/?msg=buyer+not+found&?storename='+req.params.username)
  }
});

module.exports = router;