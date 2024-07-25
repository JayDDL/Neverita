const { Recipe } = require('../models');

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll();
    res.status(200).json(recipes);  // Returns all recipes
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.create(req.body);
    res.status(201).json(recipe);  // Creates recipe
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllRecipes, createRecipe };