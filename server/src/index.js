const compression = require('compression');
const express = require('express');
const cors = require('cors');

const { connect } = require('./utils/database/connect');
const { setUpCloudinary } = require('./utils/cloudinary/cloudinary');

const { setError } = require('./utils/error/handle.error');
const UserRoutes = require('./api/user/routes');

const RecipeRoutes = require('./api/recipes/routes');
const WorkoutRoutes = require('./api/workout/routes');

connect();
setUpCloudinary();

const app = express();
app.use(compression());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: true }));

app.set('secretKey', process.env.SECRET_KEY_JWT);

app.use('/api/users', UserRoutes);
app.use('/api/recipes', RecipeRoutes);
app.use('/api/workouts', WorkoutRoutes);

app.use('*', (req, res, next) => next(setError(404, 'Route not found')));

app.use((error, req, res, next) => {
  return res
    .status(error.status || 500)
    .json(error.message || 'Unexpected error');
});

app.disable('x-powered-by');

app.listen(process.env.PORT, () => {
  console.log(`Server running on port: http://localhost:${process.env.PORT}`);
});

module.exports = { app };
