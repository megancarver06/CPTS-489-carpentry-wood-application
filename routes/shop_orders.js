var express = require('express');
var router = express.Router();
const User = require('../models/User');
const Orders = require('../models/Orders');

/* GET orders page for the shop. */
router.get('/', async function(req, res, next) {
  const user = await User.getUser(req.user.username);
  let shopname = user.username
  const orders = await Orders.findAll({
    where: {
      soldby: shopname
    }
  });
  res.render('shop_orders', { orders, user });
});

module.exports = router;