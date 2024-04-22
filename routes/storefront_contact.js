var express = require('express');
var router = express.Router();

/* GET Storefront contact page. */
router.get('/', function(req, res, next) {
  const user = req.user;
  res.render('storefront_contact', { user: user });
});

/* POST user's contact form to seller. */
router.post('/submit', function(req, res, next) {
  const user = req.user;
  const email = req.body.email;
  const subject = req.body.subject;
  const inquiry = req.body.inquiry;

  if (validateEmail(email) == false) {
    res.redirect("/storefront_contact/?msg=invalidemail");
  }

  res.render('storefront_contact_success', {user: user});

});

function validateEmail(email) {
  const valid = email.includes("@")
  return valid;
}

module.exports = router;