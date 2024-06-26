var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const user = req.user;
  res.render('contact_us', { user: user });
});

router.post('/submit', function(req, res, next) {
  const user = req.user;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const subject = req.body.subject;
  const inquiry = req.body.inquiry;

  if (validateEmail(email) == false) {
    res.redirect("/contact_us/?msg=invalidemail");
  }

  res.render('contact_us_submitted', {user: user});
});

function validateEmail(email) {
  const valid = email.includes("@")
  return valid;
}

module.exports = router;