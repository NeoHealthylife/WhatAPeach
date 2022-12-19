const RecipesRoutes = require('express').Router();
/* const upload = require('../../middlewares/file'); */
const {
  getRecipes,
  getRecipe,
  postRecipe,
  patchRecipe,
  deleteRecipe,
} = require('./controller');

const { isBasic } = require('../../middlewares/basic.middlewares');
const { isAdmin } = require('../../middlewares/admin.middlewares');

RecipesRoutes.get('/:id', /*[isBasic], */ getRecipe);
RecipesRoutes.patch('/:id', [isAdmin], patchRecipe);
RecipesRoutes.delete('/:id', [isAdmin], deleteRecipe);
RecipesRoutes.get('/', [isBasic], getRecipes);
RecipesRoutes.post('/', [isBasic], postRecipe);

module.exports = RecipesRoutes;
