const UserRoutes = require('express').Router();

const { isAdmin } = require('../../middlewares/admin.middlewares');
const { isBasic } = require('../../middlewares/basic.middlewares');

const passport = require('passport');

const {
  register,
  login,
  getUsers,
  deleteUser,
  addFavRecipes,
  addFavWorkout,
  addTodoRecipe,
  addTodoWorkout,
  deleteFavRecipes,
} = require('./controller');

UserRoutes.get('/auth/facebook', passport.authenticate('facebook'));
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
    successRedirect: '/',
    failureRedirect: '/fail',
  })
);

UserRoutes.get('/fail', (req, res) => {
  res.send('Failed attempt');
});

UserRoutes.post('/register', register);

UserRoutes.post('/login', login);
UserRoutes.get('/', getUsers);
UserRoutes.delete('/:id', [isAdmin], deleteUser);
UserRoutes.patch(
  '/',
  addFavRecipes,
  addFavWorkout,
  addTodoRecipe,
  addTodoWorkout,
  deleteFavRecipes
);
UserRoutes.patch('/addfavrecipes/:id', addFavRecipes);
UserRoutes.patch('/addfavworkout/id', addFavRecipes);
UserRoutes.patch('/deletefavrecipes/:id', addFavRecipes);
UserRoutes.patch('/deletefavworkout', addFavRecipes);

module.exports = UserRoutes;
