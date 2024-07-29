// Import the DailyMealPlan and Recipe models from the models directory
const { DailyMealPlan, Recipe } = require('../models');

// Function to get all daily meal plans
const getDailyMealPlans = async (req, res) => {
  try {
    // Fetch all daily meal plans including their associated recipes
    const mealPlans = await DailyMealPlan.findAll({
      include: [
        { model: Recipe, as: 'breakfast' }, // Include the breakfast recipe
        { model: Recipe, as: 'lunch' }, // Include the lunch recipe
        { model: Recipe, as: 'dinner' }, // Include the dinner recipe
      ],
    });
    res.status(200).json(mealPlans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to create a new daily meal plan
const createDailyMealPlan = async (req, res) => {
  try {
    // Destructure the date, breakfastId, lunchId, and dinnerId from the request body
    const { date, breakfastId, lunchId, dinnerId } = req.body;
    // Create a new daily meal plan with the provided data
    const mealPlan = await DailyMealPlan.create({ date, breakfastId, lunchId, dinnerId });
    res.status(201).json(mealPlan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export the getDailyMealPlans and createDailyMealPlan functions
module.exports = {
  getDailyMealPlans,
  createDailyMealPlan,
};