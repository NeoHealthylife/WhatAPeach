const UserRoutes = require('express').Router();

const { isAdmin } = require('../../middlewares/admin.middlewares');
const { isBasic } = require('../../middlewares/basic.middlewares');

const passport = require('passport');

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
  deleteCompletedWorkout
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
UserRoutes.delete('/:id', deleteUser);

UserRoutes.patch('/addfavrecipe', addFavRecipe);
UserRoutes.patch('/addfavworkout', addFavWorkout);
UserRoutes.patch('/deletefavrecipe', deleteFavRecipe);
UserRoutes.patch('/deletefavworkout', deleteFavWorkout);
UserRoutes.patch("/todorecipe", addTodoRecipe);
UserRoutes.patch('/todoworkout', addTodoWorkout);
UserRoutes.patch("/addcomplrecipe", addCompletedRecipe);
UserRoutes.patch("/addcomplworkout", addCompletedWorkout);
UserRoutes.patch("/deletecomplrecipe", deleteCompletedRecipe);
UserRoutes.patch("/deletecomplworkout", deleteCompletedWorkout);

module.exports = UserRoutes;
