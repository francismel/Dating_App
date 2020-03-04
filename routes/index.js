var router = require('express').Router();
var passport = require('passport');

// The root route renders our only view
router.get('/', function(req, res) {
  res.redirect('/daters');
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/daters',
    failureRedirect : '/daters'
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/daters');
});

module.exports = router;