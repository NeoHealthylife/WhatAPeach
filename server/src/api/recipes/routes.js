const RecipesRoutes = require('express').Router();
/* const upload = require('../../middlewares/file'); */
const {
  getRecipes,
  postRecipe,
  patchRecipe,
  deleteRecipe,
} = require('./controller');

const { isBasic } = require('../../middlewares/basic.middlewares');
const { isAdmin } = require('../../middlewares/admin.middlewares');

RecipesRoutes.get('/', getRecipes);
RecipesRoutes.post('/', /* [isAdmin], */ postRecipe);
RecipesRoutes.patch('/:id', [isAdmin], patchRecipe);
RecipesRoutes.delete('/:id', [isAdmin], deleteRecipe);

module.exports = RecipesRoutes;
