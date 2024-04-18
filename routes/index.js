var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


// router.post('/signin', function(req, res, next) {
//   var email = req.body.email;
//   var password = req.body.password;
//   var user = {
//     email: email,
//     password: password
//   }
//   console.log(user);
//   res.redirect('/profile');
// });

module.exports = router;
