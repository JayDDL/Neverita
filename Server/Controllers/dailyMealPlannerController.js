const { MealPlan } = require('../models');

// Get all daily meal plans
const getDailyMealPlans = async (req, res) => {
  try {
    const mealPlans = await MealPlan.findAll();
    res.status(200).json(mealPlans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new daily meal plan
const createDailyMealPlan = async (req, res) => {
  try {
    const mealPlan = await MealPlan.create(req.body);
    res.status(201).json(mealPlan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getDailyMealPlans,
  createDailyMealPlan,
};
