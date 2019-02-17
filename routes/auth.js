var express = require('express');
var router = express.Router();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');
const GOOGLE_CONSUMER_KEY = process.env.GOOGLE_CONSUMER_KEY;
const GOOGLE_CONSUMER_SECRET = process.env.GOOGLE_CONSUMER_SECRET;
const GOOGLE_AUTH_CALLBACK = process.env.GOOGLE_AUTH_CALLBACK;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CONSUMER_KEY,
    clientSecret: GOOGLE_CONSUMER_SECRET,
    callbackURL: GOOGLE_AUTH_CALLBACK,
  },
  function(token, tokenSecret, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
  }
));


/* POST auth */
router.get('/', passport.authenticate('google'), function(req, res) {
    res.send(req.user)
//   res.send('Logged in?');
});

router.get('/user', function(req, res){
    res.send(req.user);
})

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });


//See http://www.passportjs.org/docs/google/

router.get('/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/auth' }),
  function(req, res) {
    res.redirect('/');
  });


module.exports = router;


