var express = require('express');
var router = express.Router();

/* GET Storefront contact page. */
router.get('/:shopname', function(req, res, next) {
  const user = req.user;
  shopname = req.params.shopname;
  res.render('storefront_contact', { user: user, shopname} );
});

/* POST user's contact form to seller. */
router.post('/:shopname/submit', function(req, res, next) {
  shopname = req.params.shopname;
  const user = req.user;
  const email = req.body.email;
  const subject = req.body.subject;
  const inquiry = req.body.inquiry;

  if (validateEmail(email) == false) {
    res.redirect("/storefront_contact/?msg=invalidemail");
  }

  res.render('storefront_contact_success', {user: user, shopname});

});

function validateEmail(email) {
  const valid = email.includes("@")
  return valid;
}

module.exports = router;