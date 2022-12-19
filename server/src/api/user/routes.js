const UserRoutes = require('express').Router();

const { isAdmin } = require('../../middlewares/admin.middlewares');
const { isBasic } = require('../../middlewares/basic.middlewares');

const passport = require('passport');
require('./passportSetup');

const cookieSession = require('cookie-session');
const isLoggedIn = require('../../middlewares/socialLoginAuth');
const session = require('express-session');

const {
  register,
  login,
  getUsers,
  getUser,
  deleteUser,
  updatetUser,
  addFavRecipe,
  addFavWorkout,
  loginFromSocialLogin,
  deleteFavRecipe,
  deleteFavWorkout,
  deletetodorecipe,
  addTodoRecipe,
  addTodoWorkout,
  addCompletedRecipe,
  deleteCompletedRecipe,
  addCompletedWorkout,
  deleteCompletedWorkout,
} = require('./controller');
const config = require('./configs');

UserRoutes.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  })
);
// UserRoutes.use(
//   cookieSession({
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: [config.cookieKey],
//   })
// );
UserRoutes.use(passport.initialize());
UserRoutes.use(passport.session());

UserRoutes.get(
  '/auth/facebook',
  passport.authenticate('facebook', { scope: ['email', 'user_location'] })
);
UserRoutes.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: `${process.env.FRONT_ENV}/dashboard`,
    failureRedirect: `${process.env.FRONT_ENV}/login`,
  }),
  function (req, res) {
    res.redirect('/');
  }
);

UserRoutes.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);
UserRoutes.get(
  '/auth/google/callback',
  passport.authenticate('google', { session: false }),
  loginFromSocialLogin
);

UserRoutes.get('/fail', (req, res) => {
  res.send('Failed attempt');
});

// UserRoutes.get('/', isLoggedIn, (req, res) =>
//   res.send(`Welcome ${req.user.displayName}! \n ${req.user.photos['value']}`)
// );
UserRoutes.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
  res.send('You are now logged out!');
});

//WEB ROUTES
UserRoutes.post('/register', register);

UserRoutes.post('/login', login);

UserRoutes.patch('/addfavrecipe', [isBasic], addFavRecipe);
UserRoutes.patch('/addfavworkout', [isBasic], addFavWorkout);
UserRoutes.patch('/deletefavrecipe', [isBasic], deleteFavRecipe);
UserRoutes.patch('/deletefavworkout', [isBasic], deleteFavWorkout);
UserRoutes.patch('/todorecipe', [isBasic], addTodoRecipe);
UserRoutes.patch('/deletetodorecipe', [isBasic], deletetodorecipe);
UserRoutes.patch('/todoworkout', [isBasic], addTodoWorkout);
UserRoutes.patch('/addcompleterecipe', [isBasic], addCompletedRecipe);
UserRoutes.patch('/addcompleteworkout', [isBasic], addCompletedWorkout);
UserRoutes.patch('/deletecompleterecipe', [isBasic], deleteCompletedRecipe);
UserRoutes.patch('/deletecompleteworkout', [isBasic], deleteCompletedWorkout);
UserRoutes.get('/', getUsers);
UserRoutes.delete('/:id', [isAdmin], deleteUser);
UserRoutes.get('/:id', getUser);
UserRoutes.patch('/:id', updatetUser);

module.exports = UserRoutes;
