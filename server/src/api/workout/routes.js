const WorkoutRoutes = require('express').Router();
/* const upload = require('../../middlewares/file'); */
const {
  getWorkouts,
  postWorkout,
  patchWorkout,
  deleteWorkout,
} = require('./controller');

const { isBasic } = require('../../middlewares/basic.middlewares');
const { isAdmin } = require('../../middlewares/admin.middlewares');

WorkoutRoutes.get('/', [isBasic], getWorkouts);
WorkoutRoutes.post('/', [isBasic], postWorkout);
WorkoutRoutes.patch('/:id', [isAdmin], patchWorkout);
WorkoutRoutes.delete('/:id', [isAdmin], deleteWorkout);

module.exports = WorkoutRoutes;
