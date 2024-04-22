var express = require('express');
var router = express.Router();
const User = require('../models/User');
var crypto = require('crypto');

const sessionChecker = (req, res, next) => {
  if (req.session.user) {
    res.redirect('/profile');
  } else {
    next();
  }
}

/* GET home page. */
router.get('/', function (req, res, next) {
  const failed = req.query.failed;
  const user = req.session.user;

  let msg = "";
  switch (failed) {
    case "1":
      msg = "Something went wrong. Please try again.";
      break;
    case "2":
      msg = "Username already exists. Please try again.";
      break;
    case "3":
      msg = "Failed to login. Please try again.";
      break;
    default:
      break;
  }
  res.render('signup', {failed: failed, msg: msg, user: user});
});

router.post('/', async function (req, res, next) {
  // Generate salt
  let salt = crypto.randomBytes(16).toString('hex'); // Convert salt to string

  // Derive key asynchronously
  crypto.pbkdf2(req.body.password, salt, 100000, 64, 'sha512', async (err, hashedPassword) => {
    if (err) {
      console.error(err);
      res.redirect("/signup?failed=1");
    }

    try {
      const { username, usertype, email, shopname, shopdesc } = req.body;

      // Create user with hashedPassword and salt
      const user = await User.create({ 
        username, 
        password: hashedPassword.toString('hex'), // Convert hashedPassword to string
        salt, // Store the salt
        usertype, 
        email, 
        shopname, 
        shopdesc 
      });
      res.redirect("/signin?msg=created");

    } catch (error) {
      console.error(error);
      res.redirect("/signup?failed=2");
    }

  });

});


module.exports = router;
