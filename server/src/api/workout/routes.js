const WorkoutRoutes = require('express').Router();
/* const upload = require('../../middlewares/file'); */
const {
  getWorkouts,
  patchWorkout,
  patchWorkout,
  deleteWorkout,
} = require('./controller.workout');

const { isBasic } = require('../../middlewares/basic.middlewares');
const { isAdmin } = require('../../middlewares/admin.middlewares');

WorkoutsRoutes.get('/', getWorkouts);
WorkoutsRoutes.post('/', [isAdmin], postWorkout);
WorkoutsRoutes.patch('/:id', [isAdmin], patchWorkout);
WorkoutsRoutes.delete('/:id', [isAdmin], deleteWorkout);

module.exports = WorkoutRoutes;
