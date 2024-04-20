var express = require('express');
var router = express.Router();
const User = require('../models/User');

/* GET home page. */
/* GET admin users page. */
router.get('/', async function(req, res, next) {
  try {
    const users = await User.findAll();
    res.render('admin_users', { users, user: req.user }); // Pass both 'users' and 'user' variables to the template
  } catch (error) {
    next(error); // Pass any errors to the error handler middleware
  }
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