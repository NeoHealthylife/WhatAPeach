const passport = require('passport');
const config = require('./configs');
const bcrypt = require('bcrypt');
const {
  getUsers,
  _register,
  registerFromSocialLogin,
  loginFromSocialLogin,
} = require('./controller');
const User = require('./model');
const { generateNickName } = require('../../utils/string');

require('dotenv').config();

const GoogleStrategy = require('passport-google-oauth2').Strategy;
const facebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

const handleSocialLoginRequest = async (profile) => {
  console.log('handle social login request');
  // Buscamos el usuario filtrando por email
  const existingUser = await User.findOne({ email: profile.email });

  // Si encuentro el usuario, lo devuelvo
  if (existingUser) {
    return existingUser;
  } else if (existingUser.provider != 'google') {
    return done(null, false, {
      message: `You have previously signed up with a different signin method`,
    });
  } else {
    // Si no encuentro el usuario, lo creo y lo devuelvo
    const userData = {
      nickname: generateNickName(profile.email), //yo pondría aquí mejor displayName que te devuelve google
      email: profile.email,
      password: null /* bcrypt.hashSync('healthyPass2022', 10), */,
      role: 'basic',
      fullname: profile.displayName,
      provider_id: profile.id,
      provider: profile.provider,
    };
    const newUser = new User(userData);
    await newUser.save();

    return newUser;
  }
};

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
      await handleSocialLoginRequest(profile._json.email, profile, cb);
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
      // Aquí tengo el usuario que ya existía o el que acabo de crear y lo devuelvo en el callback "done". Passport lo inserta en la request
      // y llama a la url de callback configurada en la variable callbackURL.

      const user = await handleSocialLoginRequest(profile);
      return done(null, user);
    }
  )
);
