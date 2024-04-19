var express = require('express');
const Admin = require('../models/Admin');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local');
const User = require('../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signin');
});

passport.use(new LocalStrategy(async function verify(username, password, done) {
  try{
      const user = await User.findOne({where: {username: username}});
      if(!user){
        return done(null, false, {message: 'Incorrect username or password'});
      }

      // crypto.pbkdf2(password, user.salt, 100000, 64, 'sha512', (err, key) => {

  }catch(error){
    return done(error);
  }


}));

/* POST signin form submission. */
router.post('/', async function(req, res, next) {
  // var email = req.body.email;
  // var password = req.body.password;
  // var user = {
  //   email: email,
  //   password: password
  // }
//   const user = await Admin.findAdmin(req.body.username, req.body.password)
//   if(user !== null){
//     // req.session.user = user;
//     res.redirect('/profile');

//   }else{
//     res.redirect('/?msg=fail');
//   }
//   console.log(user);
});

module.exports = router;