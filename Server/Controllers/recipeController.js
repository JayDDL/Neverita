// Import the Recipe model from the models directory
const { Recipe } = require('../models');

// Function to get all recipes
const getAllRecipes = async (req, res) => {
  try {
    // Fetch all recipes
    const recipes = await Recipe.findAll();
    res.status(200).json(recipes);  // Returns all recipes
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to get a recipe by its ID
const getRecipeById = async (req, res) => {
  try {
    // Fetch the recipe by its primary key (ID)
    const recipe = await Recipe.findByPk(req.params.id);
    if (recipe) {
      res.status(200).json(recipe);
    } else {
      // Send a 404 error response if the recipe is not found
      res.status(404).json({ error: 'Recipe ID not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to create a new recipe
const createRecipe = async (req, res) => {
  try {
    // Create a new recipe with the data from the request body
    const recipe = await Recipe.create(req.body);
    res.status(201).json(recipe);  // Creates recipe
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export the getAllRecipes, createRecipe, and getRecipeById functions
module.exports = { getAllRecipes, createRecipe, getRecipeById };