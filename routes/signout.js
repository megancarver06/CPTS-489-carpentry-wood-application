var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  req.logout(function(err) {
    if(err) {
      console.log(err);
      return next(err);
    }
    req.session.destroy();
    res.redirect('/');
  });
});

module.exports = router;
