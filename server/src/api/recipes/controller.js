const Recipes = require('./model.recipes');
const { setError } = require('../../utils/error/handle.error');
const { deleteFile } = require('../../middlewares/delete-file');

const getRecipes = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 5;
    const page = parseInt(req.query.page, 10) || 1;
    const recipes = await Recipes.paginate({}, { limit, page });
    return res.json({
      status: 200,
      message: 'Recovered all recipes',
      data: { recipes },
    });
  } catch (error) {
    return next(setError(500, 'Fail to recover recipes'));
  }
};

const postRecipe = async (req, res, next) => {
  try {
    /* const { authorId } = req.body;
    const author = await Author.findById(authorId); */

    const recipeObject = { ...req.body };

    /* if (author) {
      paintingObject.author = author._id;
    } */

    const newRecipe = new Recipes(recipeObject);

    if (req.file) {
      newRecipe.image = req.file.path;
    }

    const newRecipeInDB = await newRecipe.save();

    /*if (author) {
      author.paintings = author.paintings.concat(newPaintingInDB._id);
      await author.save();
    } */

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
    const editRecipe = new Recipes(req.body);
    editRecipe._id = id;
    const recipeDB = await Recipes.findByIdAndUpdate(id, editRecipe);
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
    const deletedRecipe = await Recipes.findByIdAndDelete(id);
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
  postRecipe,
  patchRecipe,
  deleteRecipe,
};
