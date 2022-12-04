const passport = require('passport');
const config = require('./configs');
const {
  getUsers,
  _register,
  registerFromSocialLogin,
  loginFromSocialLogin,
} = require('./controller');
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
    async (request, accessToken, refreshToken, profile, cb) => {
      const { email } = profile._json;
      const users = await User.find();

      // Find existing user
      const existingUser = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (existingUser) {
        // Login
        try {
          const user = loginFromSocialLogin(email);
          return cb(null, user);
        } catch (err) {
          return cb(err);
        }
      } else {
        // Register
        try {
          const newUser = registerFromSocialLogin(profile);
          return cb(null, newUser);
        } catch (err) {
          return cb(err);
        }
      }
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
    async (request, accessToken, refreshToken, profile, cb) => {
      const { email } = profile;
      const users = await User.find();

      // Find existing user
      const existingUser = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (existingUser) {
        // Login
        try {
          const user = loginFromSocialLogin(email);
          return cb(null, user);
        } catch (err) {
          return cb(err);
        }
      } else {
        // Register
        try {
          const newUser = registerFromSocialLogin(profile);
          return cb(null, newUser);
        } catch (err) {
          return cb(err);
        }
      }
    }
  )
);
