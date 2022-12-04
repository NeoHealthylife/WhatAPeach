const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./model');
const { setError } = require('../../utils/error/handle.error');
const { generateNickName } = require('../../utils/string');

const register = async (req, res, next) => {
  try {
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

const mapGoogleData = (profile) => {
  return {
    nickname: generateNickName(profile.email),
    email: profile.email,
    password: bcrypt.hashSync('healthyPass2022', 10),
    role: 'basic',
    fullname: profile.displayName,
    provider_id: profile.id,
    provider: profile.provider,
  };
};

const mapFacebookData = (profile) => {
  return {
    nickname: generateNickName(profile._json.email),
    email: profile._json.email,
    password: bcrypt.hashSync('healthyPass2022', 10),
    role: 'basic',
    fullname: profile.displayName,
    provider_id: profile.id,
    provider: profile.provider,
  };
};

const registerFromSocialLogin = async (profile) => {
  try {
    let newUserBody = {};
    if (profile.provider === 'google') {
      newUserBody = mapGoogleData(profile);
    }

    if (profile.provider === 'facebook') {
      newUserBody = mapFacebookData(profile);
    }

    const newUser = new User(newUserBody);

    newUser.save();
    return newUser;
  } catch (err) {
    return setError(500, 'User register fail');
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

const loginFromSocialLogin = async (email) => {
  try {
    const userInfo = await User.findOne({ email: email });
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
  } catch (error) {
    return setError(500, 'User login fail');
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.json({
      status: 200,
      message: 'Recovered all Users',
      data: { users },
    });
  } catch (error) {
    return next(setError(500, 'Fail to recover Users'));
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

const addFavRecipe = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const { recipeId } = req.body;
    const upadateUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: { favRecipes: recipeId },
      },
      { new: true }
    );
    return res.status(200).json(upadateUser);
  } catch (err) {
    return next(err);
  }
};

const deleteFavRecipe = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const { recipeId } = req.body;
    const upadateUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { favRecipes: recipeId },
      },
      { new: true }
    );
    return res.status(200).json(upadateUser);
  } catch (err) {
    return next(err);
  }
};

const addFavWorkout = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const { workoutId } = req.body;
    const upadateUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: { favWorkouts: workoutId },
      },
      { new: true }
    );
    return res.status(200).json(upadateUser);
  } catch (err) {
    return next(err);
  }
};

const deleteFavWorkout = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const { workoutId } = req.body;
    const upadateUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { favWorkout: workoutId },
      },
      { new: true }
    );
    return res.status(200).json(upadateUser);
  } catch (err) {
    return next(err);
  }
};

const addTodoRecipe = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const { recipeId } = req.body;
    const upadateUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: { toDoRecipes: recipeId },
      },
      { new: true }
    );
    return res.status(200).json(upadateUser);
  } catch (err) {
    return next(err);
  }
};

const addTodoWorkout = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const { workoutId } = req.body;
    const upadateUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: { toDoWorkouts: workoutId },
      },
      { new: true }
    );
    return res.status(200).json(upadateUser);
  } catch (err) {
    return next(err);
  }
};

const addCompletedRecipe = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const { recipeId } = req.body;
    const upadateUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { toDoRecipes: recipeId },
        $push: { completedRecipes: recipeId },
      },
      { new: true }
    );
    return res.status(200).json(upadateUser);
  } catch (err) {
    return next(err);
  }
};

const deleteCompletedRecipe = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const { recipeId } = req.body;
    const upadateUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { completedRecipes: recipeId },
      },
      { new: true }
    );
    return res.status(200).json(upadateUser);
  } catch (err) {
    return next(err);
  }
};

const addCompletedWorkout = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const { workoutId } = req.body;
    const upadateUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { toDoWorkouts: workoutId },
        $push: { completedWorkouts: workoutId },
      },
      { new: true }
    );
    return res.status(200).json(upadateUser);
  } catch (err) {
    return next(err);
  }
};

const deleteCompletedWorkout = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const { workoutId } = req.body;
    const upadateUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { completedWorkouts: workoutId },
      },
      { new: true }
    );
    return res.status(200).json(upadateUser);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  register,
  registerFromSocialLogin,
  loginFromSocialLogin,
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
};
