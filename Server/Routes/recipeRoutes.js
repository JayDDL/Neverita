const express = require('express');
const { getAllRecipes, createRecipe } = require('../Controllers/recipeController');

const recipeRouter = express.Router();

// GET requests to '/recipes'
recipeRouter.get('/', async (req, res) => {
  try {
    await getAllRecipes(req, res);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// POST requests to '/recipes'
recipeRouter.post('/', async (req, res) => {
  try {
    await createRecipe(req, res);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = recipeRouter;