const Workout = require('./model');
const { setError } = require('../../utils/error/handle.error');
const { deleteFile } = require('../../middlewares/delete-file');

const getWorkouts = async (req, res, next) => {
  try {
    const workouts = await Workout.find();
    return res.json({
      status: 200,
      message: 'Recovered all workouts',
      data: { workouts },
    });
  } catch (error) {
    return next(setError(500, 'Fail to recover workouts'));
  }
};

const postWorkout = async (req, res, next) => {
  try {
    const newWorkout = new Workout(req.body);
    console.log(req.body);
    await newWorkout.save();
    return res.status(201).json({
      message: 'Created Workout',
      data: { newWorkout },
    });
  } catch (error) {
    return next(setError(500, error.message | 'Failed in workout post'));
  }
};

const patchWorkout = async (req, res, next) => {
  try {
    const { id } = req.params;
    const editWorkout = new Workout(req.body);
    editWorkout._id = id;
    const workoutDB = await Workout.findByIdAndUpdate(id, editWorkout);
    if (req.file) {
      deleteFile(workoutDB.image);
      editWorkout.image = req.file.path;
    }
    if (!workoutDB) {
      return next('workout not found');
    }
    return res.status(200).json({
      new: editWorkout,
      old: workoutDB,
    });
  } catch (error) {
    return next(setError(500, error.message | 'Failed in workout update'));
  }
};

const deleteWorkout = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedWorkout = await Workout.findByIdAndDelete(id);
    if (deletedWorkout.image) {
      deleteFile(deletedWorkout.image);
    }
    if (!deletedWorkout) {
      return next(setError(404, 'Workout not found'));
    }
    return res.status(200).json({
      message: 'Workout deleted',
      deletedWorkout,
    });
  } catch (error) {
    return next(setError(500, error.message | 'Failed in Workout deletion'));
  }
};

module.exports = {
  getWorkouts,
  postWorkout,
  patchWorkout,
  deleteWorkout,
};
