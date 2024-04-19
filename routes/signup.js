var express = require('express');
var router = express.Router();
const User = require('../models/User');
var crypto = require('crypto');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('signup');
});

router.post('/', async function (req, res, next) {
  // Generate salt
  let salt = crypto.randomBytes(16);

  // Derive key asynchronously
  crypto.pbkdf2(req.body.password, salt, 100000, 64, 'sha512', async (err, hashedPassword) => {
    if (err) {
      console.error(err);
      res.redirect("/signup?failed=1");
    }

    try {
      const { username, password, usertype, email, shopname, shopdesc } = req.body;


      // Create user with derivedKey
      const user = await User.create({ username, password: hashedPassword, usertype, email, shopname, shopdesc });
      res.redirect("/signin?msg=created");

    } catch (error) {
      console.error(error);
      res.redirect("/signup?failed=2");
    }

  });

});

module.exports = router;
