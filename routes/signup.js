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
router.get('/', function(req, res, next) {
  res.render('signup');
});

router.post('/', async function(req, res, next) {
  try {
    const { username, password, usertype, email, shopname, shopdesc } = req.body;
    
    // Generate salt
    let salt = crypto.randomBytes(16);
    
    // Derive key asynchronously
    let derivedKey = await new Promise((resolve, reject) => {
      crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, key) => {
        if (err) reject(err);
        resolve(key.toString('hex'));
      });
    });

    // Create user with derivedKey
    const user = await User.create({ username, password: derivedKey, usertype, email, shopname, shopdesc });
    res.redirect("/signin?msg=created");

  } catch(error) {
    console.error(error);
    res.redirect("/signup?failed=2");
  }
});

module.exports = router;
