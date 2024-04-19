var express = require('express');
var router = express.Router();
const User = require('../models/User');

const sessionChecker = (req, res, next) => {
  if (req.session.user) {
    res.redirect('/profile');
  } else {
    next();
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup');
});

router.post('/', async function(req, res, next) {
  try {
    const { username, password, usertype, email, shopname, shopdesc } = req.body;
    console.log(req.body)
    const user = await User.create({ username, password, usertype, email, shopname, shopdesc });
    res.redirect("/profile?msg=created");
  } catch(error) {
    console.log(req.body)
    console.error(error);
    res.redirect("/signup?msg=error");
  }
});

module.exports = router;
