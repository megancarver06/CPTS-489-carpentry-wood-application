var express = require('express');
var router = express.Router();
const Orders = require('../models/Orders');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const user = req.user;
    const orders = await Orders.findOrders();
    res.render('order_history', { user: user, orders: orders });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
