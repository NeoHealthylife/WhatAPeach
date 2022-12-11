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
UserRoutes.get('/', getUsers);
UserRoutes.get("/:id", getUser);
UserRoutes.delete('/:id', deleteUser);
UserRoutes.patch('/:id', updatetUser);
UserRoutes.patch('/addfavrecipe', addFavRecipe);
UserRoutes.patch('/addfavworkout', addFavWorkout);
UserRoutes.patch('/deletefavrecipe', deleteFavRecipe);
UserRoutes.patch('/deletefavworkout', deleteFavWorkout);
UserRoutes.patch('/todorecipe', addTodoRecipe);
UserRoutes.patch('/todoworkout', addTodoWorkout);
UserRoutes.patch('/addcomplrecipe', addCompletedRecipe);
UserRoutes.patch('/addcomplworkout', addCompletedWorkout);
UserRoutes.patch('/deletecomplrecipe', deleteCompletedRecipe);
UserRoutes.patch('/deletecomplworkout', deleteCompletedWorkout);

module.exports = UserRoutes;
