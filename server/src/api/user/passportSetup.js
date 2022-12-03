const passport = require('passport');
const config = require('./configs');

require('dotenv').config();

const GoogleStrategy = require('passport-google-oauth2').Strategy;
const facebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new facebookStrategy(
    {
      clientID: config.facebook.id,
      clientSecret: config.facebook.secret,
      callbackURL: 'http://localhost:8080/auth/facebook/callback',
      profileFields: [
        'id',
        'displayName',
        'name',
        'gender',
        'picture.type(large)',
        'email',
      ],
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOrCreate({ facebook: profile.id }, function (err, user) {
        return done(err, user);
      });
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: config.google.id,
      clientSecret: config.google.secret,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
    }
  )
);
