const passport = require('passport');
const config = require('./configs');
const { getUsers } = require('./controller');
const User = require('./model');

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
      callbackURL: 'http://localhost:3000/api/users/auth/facebook/callback',
      profileFields: [
        'id',
        'displayName',
        'name',
        'gender',
        'email',
        'picture.type(large)',
      ],
    },
    function (accessToken, refreshToken, profile, done) {
      console.log({ profile });
      /*
      User.findOrCreate({ facebook: profile.id }, function (err, user) {
        return done(err, user);
      });
      */
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: config.google.id,
      clientSecret: config.google.secret,
      callbackURL: 'http://localhost:3000/api/users/auth/google/callback',
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      const { email } = profile;
      const dbUser = User.findOne({ email: email });
      console.log(dbUser);
    }
  )
);
