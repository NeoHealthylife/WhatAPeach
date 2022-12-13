const Recipe = require('./model');
const { setError } = require('../../utils/error/handle.error');
const { deleteFile } = require('../../middlewares/delete-file');

const getRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find();
    return res.json({
      status: 200,
      message: 'Recovered all recipes',
      data: { recipes },
    });
  } catch (error) {
    return next(setError(500, 'Fail to recover recipes'));
  }
};

const getRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipebyid = await Recipe.findById(id);
    return res.status(200).json(recipebyid);
  } catch (err) {
    return next(err);
  }
};
const postRecipe = async (req, res, next) => {
  try {
    const newRecipe = new Recipe(req.body);
    if (req.file) {
      newRecipe.image = req.file.path;
    }
    await newRecipe.save();
    return res.status(201).json({
      message: 'Created Recipe',
      data: { newRecipe },
    });
  } catch (error) {
    return next(setError(500, error.message | 'Failed in recipe post'));
  }
};

const patchRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const editRecipe = new Recipe(req.body);
    editRecipe._id = id;
    const recipeDB = await Recipe.findByIdAndUpdate(id, editRecipe);
    if (req.file) {
      deleteFile(recipeDB.image);
      editRecipe.image = req.file.path;
    }
    if (!recipeDB) {
      return next('recipe not found');
    }
    return res.status(200).json({
      new: editRecipe,
      old: recipeDB,
    });
  } catch (error) {
    return next(setError(500, error.message | 'Failed in recipe update'));
  }
};

const deleteRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedRecipe = await Recipe.findByIdAndDelete(id);
    if (deletedRecipe.image) {
      deleteFile(deletedRecipe.image);
    }
    if (!deletedRecipe) {
      return next(setError(404, 'Recipe not found'));
    }
    return res.status(200).json({
      message: 'Recipe deleted',
      deletedRecipe,
    });
  } catch (error) {
    return next(setError(500, error.message | 'Failed in recipe deletion'));
  }
};

module.exports = {
  getRecipes,
  getRecipe,
  postRecipe,
  patchRecipe,
  deleteRecipe,
};
