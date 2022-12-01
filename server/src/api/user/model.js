const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    nickname: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, required: true },
    role: { type: String, enum: ['admin', 'basic'], default: 'basic' },
    fullname: { type: String, unique: true, required: true },
    age: { type: Number },
    height: { type: Number },
    weight: { type: Number },
    diet: {
      type: String,
      enum: ['vegetarian', 'vegan', 'normal'],
      required: true,
    },
    status: { type: String, enum: ['low', 'medium', 'high'], required: true },
    target: {
      type: String,
      required: true,
      enum: ['lose weight', 'build muscle', 'definition'],
      required: true,
    },
    equipment: { type: Boolean },
    favRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'recipes' }],
    favWorkouts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'workouts' }],
    toDoRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'recipes' }],
    toDoWorkouts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'workouts' }],
    completedWorkouts: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'workouts' },
    ],
    completedRecipes: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'recipes' },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

module.exports = mongoose.model('user', userSchema);
