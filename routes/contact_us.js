var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact_us');
});

router.post('/submit', function(req, res, next) {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const subject = req.body.subject;
  const inquiry = req.body.inquiry;

  if (validateEmail(email) == false) {
    res.redirect("/contact_us/?msg=invalidemail");
  }

  res.render('contact_us_submitted');
});

function validateEmail(email) {
  const valid = email.includes("@")
  return valid;
}

module.exports = router;