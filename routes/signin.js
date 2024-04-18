var express = require('express');
const Admin = require('../models/Admin');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signin');
});

/* POST signin form submission. */
router.post('/', async function(req, res, next) {
  // var email = req.body.email;
  // var password = req.body.password;
  // var user = {
  //   email: email,
  //   password: password
  // }
  const user = await Admin.findAdmin(req.body.username, req.body.password)
  if(user !== null){
    // req.session.user = user;
    res.redirect('/profile');

  }else{
    res.redirect('/?msg=fail');
  }
  console.log(user);
});

module.exports = router;