const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./model');
const { setError } = require('../../utils/error/handle.error');
const { generateNickName } = require('../../utils/string');

const register = async (req, res, next) => {
  try {
    if (!req.body.provider_id) {
      const now = new Date();
      req.body.providerid = `organic${now.getTime()}`;
      req.body.provider = 'organic';
    }
    const newUser = new User(req.body);
    const userDuplicate = await User.findOne({ nickname: newUser.nickname });

    if (userDuplicate) return next('User alredy exists');

    newUser.save();
    return res.json({
      status: 201,
      message: 'user registered',
      data: newUser,
    });
  } catch (err) {
    return next(setError(500, 'User register fail'));
  }
};

const login = async (req, res, next) => {
  try {
    const userInfo = await User.findOne({ nickname: req.body.nickname });
    if (bcrypt.compareSync(req.body.password, userInfo.password)) {
      userInfo.password = null;
      const token = jwt.sign(
        {
          id: userInfo._id,
          nickname: userInfo.nickname,
          role: userInfo.role,
        },
        req.app.get('secretKey'),
        { expiresIn: '10h' }
      );
      return res.json({
        status: 200,
        message: 'welcome User',
        user: userInfo,
        token: token,
      });
    } else {
      return next('Incorrect password');
    }
  } catch (error) {
    return next(setError(500, 'User login fail'));
  }
};

/**
 * Esta función es llamada por la ruta /auth/google/callback.
 * En el parámetro req ya viene insertado el user y se puede
 * acceder a él utilizando req.user.
 * Este controlador lo único que hace es generar un JWT y devolverlo al frontend
 * junto al user.
 */
const loginFromSocialLogin = async (req, res, next) => {
  try {
    const token = jwt.sign(
      {
        id: req.user._id,
        nickname: req.user.nickname,
        role: req.user.role,
      },
      req.app.get('secretKey'),
      { expiresIn: '10h' }
    );

    return res.json({
      status: 200,
      message: 'welcome User',
      user: req.user,
      token: token,
    });
  } catch (error) {
    console.log('error', error);
    return next(setError(500, 'User login fail'));
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate('favRecipes');
    return res.json({
      status: 200,
      message: 'Recovered all Users',
      data: { users },
    });
  } catch (error) {
    return next(setError(500, 'Fail to recover Users'));
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userbyid = await User.findById(id).populate(
      'favRecipes favWorkouts toDoRecipes toDoWorkouts completedWorkouts completedRecipes'
    );
    return res.status(200).json(userbyid);
  } catch (err) {
    return next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    return res.status(200).json('User deleted');
  } catch (err) {
    return next(err);
  }
};

// const updatetUser = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const user = new User(req.body);
//     user._id = id;
//     const editUser = await User.findByIdAndUpdate(id);
//     return res.status(200).json(editUser);
//   } catch (err) {
//     return next(err);
//   }
// };

const addFavRecipe = async (req, res, next) => {
  try {
    const { userId, recipeId } = req.body;
    console.log(req.body);
    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: { favRecipes: recipeId },
      },
      { new: true }
    );
    console.log(updateUser);
    return res.status(200).json(updateUser);
  } catch (err) {
    return next(err);
  }
};

const deleteFavRecipe = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const { recipeId } = req.body;
    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { favRecipes: recipeId },
      },
      { new: true }
    );
    return res.status(200).json(updateUser);
  } catch (err) {
    return next(err);
  }
};

const addFavWorkout = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const { workoutId } = req.body;
    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: { favWorkouts: workoutId },
      },
      { new: true }
    );
    return res.status(200).json(updateUser);
  } catch (err) {
    return next(err);
  }
};

const deleteFavWorkout = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const { workoutId } = req.body;
    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { favWorkout: workoutId },
      },
      { new: true }
    );
    return res.status(200).json(updateUser);
  } catch (err) {
    return next(err);
  }
};

const addTodoRecipe = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const { recipeId } = req.body;
    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: { toDoRecipes: recipeId },
      },
      { new: true }
    );
    return res.status(200).json(updateUser);
  } catch (err) {
    return next(err);
  }
};

const addTodoWorkout = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const { workoutId } = req.body;
    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: { toDoWorkouts: workoutId },
      },
      { new: true }
    );
    return res.status(200).json(updateUser);
  } catch (err) {
    return next(err);
  }
};

const addCompletedRecipe = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const { recipeId } = req.body;
    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { toDoRecipes: recipeId },
        $push: { completedRecipes: recipeId },
      },
      { new: true }
    );
    return res.status(200).json(updateUser);
  } catch (err) {
    return next(err);
  }
};

const deleteCompletedRecipe = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const { recipeId } = req.body;
    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { completedRecipes: recipeId },
      },
      { new: true }
    );
    return res.status(200).json(updateUser);
  } catch (err) {
    return next(err);
  }
};

const addCompletedWorkout = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const { workoutId } = req.body;
    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { toDoWorkouts: workoutId },
        $push: { completedWorkouts: workoutId },
      },
      { new: true }
    );
    return res.status(200).json(updateUser);
  } catch (err) {
    return next(err);
  }
};

const deleteCompletedWorkout = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const { workoutId } = req.body;
    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { completedWorkouts: workoutId },
      },
      { new: true }
    );
    return res.status(200).json(updateUser);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  register,
  loginFromSocialLogin,
  login,
  getUsers,
  getUser,
  // updatetUser,
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
};
