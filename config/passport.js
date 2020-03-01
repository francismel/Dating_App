var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var Dater = require('../models/dater');

// configuring Passport!
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    // a user has logged in via OAuth!
    Dater.findOne({ 'googleId': profile.id }, function(err, dater) {
      if (err) return cb(err);
      if (dater) {
        console.log("You have logged in before!")
        return cb(null, dater);
      } else {
        var newDater = new Dater({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
          bio:null,
        });
        newDater.save(function(err) {
          if (err) return cb(err);
          return cb(null, newDater);
        });
        return cb(null, dater);

      }
    });
  }
));

passport.serializeUser(function(dater, done) {
  done(null, dater.id);
});

passport.deserializeUser(function(id, done) {
  Dater.findById(id, function(err, dater) {
    done(err, dater);
  });
});



