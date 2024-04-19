var express = require('express');
var router = express.Router();
// const Buyer = require('../models/Buyer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup');
});

router.post('/signup', async function(req, res, next) {
  try {
    const { username, password, email, accountType, storeName } = req.body;

    if (accountType === 'Buyer') {
      await Buyer.create({ username, password, email });
    } else if (accountType === 'Admin') {
      await Admin.create({ username, password, email });
    } else if (accountType === 'Seller') {
      await Seller.create({ username, password, email, storeName });
    }

    // Redirect to profile page or any other page after successful sign up
    res.redirect("/profile?msg=created");
  } catch(error) {
    console.error(error);
    res.redirect("/signup?msg=error");
  }
});

module.exports = router;
