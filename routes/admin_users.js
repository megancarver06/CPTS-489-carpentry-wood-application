var express = require('express');
var router = express.Router();
const User = require('../models/User');

/* GET home page. */
router.get('/', async function(req, res, next) {
  //const buyers = await Buyer.findAll();
  //const sellers = await Seller.findAll();
  //res.render('admin_users', {buyers, sellers});
  const users = await User.findAll();
  res.render('admin_users', { users });
});

router.get("/delete/:username", async function(req, res, next) {
  const user = await User.getUser(req.params.username)
  if (user) {
    await user.destroy()
    res.redirect('/admin_users/?msg=successdel&?username='+req.params.username)
  } else {
    res.redirect('/admin_users/?msg=user+not+found&?username='+req.params.username)
  }
});

module.exports = router;