const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./model.user');
const { setError } = require('../../utils/error/handle.error');

const register = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const userDuplicate = await User.findOne({ username: newUser.username });

    if (userDuplicate) return next('User alredy exists');

    const newUserDb = newUser.save();
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
    const userInfo = await User.findOne({ username: req.body.username });
    if (bcrypt.compareSync(req.body.password, userInfo.password)) {
      userInfo.password = null;
      const token = jwt.sign(
        {
          id: userInfo._id,
          username: userInfo.username,
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

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = new User(req.body);
    user._id = id;
    const editUser = await User.findByIdAndUpdate(id, user);
    return res.status(200).json(editUser);
  } catch (err) {
    return next(err);
  }
};

module.exports = { register, login, getUsers, deleteUser, updateUser };
