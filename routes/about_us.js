var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const user = req.user;
  res.render('about_us', { user: user });
});

module.exports = router;
