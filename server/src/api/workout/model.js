const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true },
    time: { type: Number, required: true },
    material: { type: [String] },
    image: { type: String },
    equipment: { Boolean },
    description: { type: String },
    workout: { type: [String] },
    tags: { type: [String] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('recipe', recipeSchema);
