var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
var crypto = require('crypto');

passport.use(new LocalStrategy(async function verify(username, password, done) {
  try {
    const user = await User.findOne({ where: { username: username } });
    console.log("Retrieved user:", user); // Add this line to log the user object
    
    if (!user) {
      return done(null, false, { message: 'Incorrect username or password' });
    }

    // Hash the provided password using the stored salt
    const hashedPassword = crypto.pbkdf2Sync(password, user.salt, 100000, 64, 'sha512').toString('hex');
    console.log("Hashed password", hashedPassword); // Add this line to log the hashed password (for debugging purposes
    // Compare the hashed provided password with the stored hashed password
    if (hashedPassword !== user.password) {
      return done(null, false, { message: 'Incorrect username or password' });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


/* POST signin form submission. */
router.post('/', passport.authenticate('local', {
  successRedirect: '/?login=success',
  failureRedirect: '/signin?failed=1',
  failureFlash: true
}));


/* GET signin page. */
router.get('/', function (req, res, next) {
  const failed = req.query.failed;
  const user = req.user;
  res.render('signin', { failed: failed, user: user }); // Combine failed and user into a single object
});



module.exports = router;
