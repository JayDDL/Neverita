const express = require('express'); // Import the Express module
const { getAllRecipes, createRecipe, getRecipeById } = require('../Controllers/recipeController'); // Import the controller functions for recipes

const recipeRouter = express.Router(); // Create a new router object for recipes

// GET all recipes
recipeRouter.get('/', async (req, res) => { // Define a route to get all recipes
  try {
    await getAllRecipes(req, res); // Call the getAllRecipes function
  } catch (error) {
    res.status(500).send(error.message); // Send a 500 error response if an error occurs
  }
});

// GET a recipe by ID
recipeRouter.get('/:id', async (req, res) => { // Define a route to get a recipe by ID
  try {
    await getRecipeById(req, res); // Call the getRecipeById function
  } catch (error) {
    console.log('Cannot get recipe by ID', error); // Log the error if it occurs
    res.status(500).send(error.message); // Send a 500 error response if an error occurs
  }
});

// POST a new recipe
recipeRouter.post('/', async (req, res) => { // Define a route to create a new recipe
  try {
    await createRecipe(req, res); // Call the createRecipe function
  } catch (error) {
    res.status(500).send(error.message); // Send a 500 error response if an error occurs
  }
});

module.exports = recipeRouter; // Export the recipeRouter
