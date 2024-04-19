var express = require('express');
var router = express.Router();

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

module.exports = router;