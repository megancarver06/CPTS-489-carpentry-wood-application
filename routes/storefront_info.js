var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:shopname', function(req, res, next) {
  const user = req.user;
  shopname = req.params.shopname;
  res.render('storefront_info', { user: user, shopname} );
});

module.exports = router;