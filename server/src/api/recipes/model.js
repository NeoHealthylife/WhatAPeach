const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true },
    time: { type: Number, required: true },
    ingredients: { type: [String], required: true },
    image: { type: String },
    description: { type: String },
    recipe: [String],
    tags: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('recipe', recipeSchema);
