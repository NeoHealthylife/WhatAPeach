const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true, required: true },
    time: { type: Number, required: true },
    ingredients: [{ type: String, required: true }],
    nutrients: [{ type: String, required: true }],
    image: { type: String, required: true },
    recipe: [{ type: String, required: true }],
    tags: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('recipes', recipeSchema);
