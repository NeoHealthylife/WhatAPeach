const WorkoutRoutes = require('express').Router();
const upload = require('../../middlewares/file');

const {
  getWorkouts,
  postWorkout,
  patchWorkout,
  deleteWorkout,
} = require('./controller');

const { isBasic } = require('../../middlewares/basic.middlewares');
const { isAdmin } = require('../../middlewares/admin.middlewares');

WorkoutRoutes.patch('/:id', [isAdmin], patchWorkout);
WorkoutRoutes.delete('/:id', [isBasic], deleteWorkout);
WorkoutRoutes.get('/', [isBasic], getWorkouts);
WorkoutRoutes.post('/', [isBasic], upload.single('image'), postWorkout);

module.exports = WorkoutRoutes;
