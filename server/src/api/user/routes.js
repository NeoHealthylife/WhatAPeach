const UserRoutes = require('express').Router();

const { isAdmin } = require('../../middlewares/admin.middlewares');
const { isBasic } = require('../../middlewares/basic.middlewares');

const passport = require('passport');
require('./passportSetup');

const cookieSession = require('cookie-session');
const isLoggedIn = require('../../middlewares/socialLoginAuth');

const {
  register,
  login,
  getUsers,
  deleteUser,
  addFavRecipe,
  addFavWorkout,
  deleteFavRecipe,
  deleteFavWorkout,
  addTodoRecipe,
  addTodoWorkout,
  addCompletedRecipe,
  deleteCompletedRecipe,
  addCompletedWorkout,
  deleteCompletedWorkout,
} = require('./controller');

UserRoutes.use(
  cookieSession({
    name: 'google-auth-session',
    keys: ['key1', ' key2'],
  })
);
UserRoutes.use(passport.initialize());
UserRoutes.use(passport.session());

UserRoutes.get(
  '/auth/facebook',
  passport.authenticate('facebook', { scope: ['email', 'user_location'] })
);
UserRoutes.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/fail',
  })
);

UserRoutes.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);
UserRoutes.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
  }),
  function (req, res) {
    console.log('AQUI');
    res.redirect('/');
  }
);

UserRoutes.get('/fail', (req, res) => {
  res.send('Failed attempt');
});

UserRoutes.get('/', isLoggedIn, (req, res) =>
  res.send(`Welcome ${req.user.displayName}! \n ${req.user.photos['value']}`)
);
UserRoutes.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
});

//WEB ROUTES
UserRoutes.post('/register', register);

UserRoutes.post('/login', login);
UserRoutes.get('/', getUsers);
UserRoutes.delete('/:id', deleteUser);

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
