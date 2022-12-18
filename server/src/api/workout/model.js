const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true, required: true },
    time: { type: Number, required: true, required: true },
    material: [{ type: String }],
    imageCard: { type: String, required: true },
    image: { type: String, required: true },
    video: { type: String },
    equipment: { type: Boolean, required: true },
    description: { type: String, required: true },
    workout: [{ type: String, required: true }],
    descriptionChallenge: [{ type: String, required: true }],
    tags: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('workouts', workoutSchema);
