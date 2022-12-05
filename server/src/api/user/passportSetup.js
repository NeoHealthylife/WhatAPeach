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

const handleSocialLoginRequest = async (email, profile, cb) => {
  const users = await User.find();

  // Find existing user
  const existingUser = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );

  if (existingUser) {
    // Login
    try {
      const user = loginFromSocialLogin(email, profile); //inicialmente pasabamos solo el email por parametro
      //pero he metido profile tbn en vistas a que de esa forma le llege el objeto entero a la función de registro. No estoy seguro de este paso
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
      passReqToCallback: true, //esto para que lo ponemos?
    },
    async (request, accessToken, refreshToken, profile, cb) => {
      await handleSocialLoginRequest(profile.email, profile); // hemos comprobado que solo si traemos aquí profile se consigue generar
      //el token para que luego se le pueda pasar a la función de login.
      const token = jwt.sign(
        { email: profile.email },
        process.env.SECRET_KEY_JWT,
        { expiresIn: '1d' }
      );
      const user = {
        //pero no estoy seguro si retornando este "user", le llega a handlesocialloginrequest y por tanto podemos logear
        nickname: generateNickName(profile._json.email),
        email: profile._json.email,
        password: bcrypt.hashSync('healthyPass2022', 10),
        role: 'basic',
        fullname: profile.displayName,
        provider_id: profile.id,
        provider: profile.provider,
        token,
      };
      return done(null, user);
    }
  )
);
