const express = require('express');
const { getAllRecipes, createRecipe } = require('../Controllers/recipeController');

const recipeRouter = express.Router();

// GET all recipes
recipeRouter.get('/', async (req, res) => {
  try {
    await getAllRecipes(req, res);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// GET a recipe by ID
recipeRouter.get('/:id', async (req, res) => {
  try {
    await getRecipeById(req, res);
  } catch (error) {
    console.log('Cannot get recipe by ID', error)
    res.status(500).send(error.message);
  }
});

// POST a new recipe
recipeRouter.post('/', async (req, res) => {
  try {
    await createRecipe(req, res);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = recipeRouter;