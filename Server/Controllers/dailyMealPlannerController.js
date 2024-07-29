const { DailyMealPlan, Recipe } = require('../models');

// Get all daily meal plans
const getDailyMealPlans = async (req, res) => {
  try {
    const mealPlans = await DailyMealPlan.findAll({
      include: [
        { model: Recipe, as: 'breakfast' },
        { model: Recipe, as: 'lunch' },
        { model: Recipe, as: 'dinner' },
      ],
    });
    res.status(200).json(mealPlans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new daily meal plan
const createDailyMealPlan = async (req, res) => {
  try {
    const { date, breakfastId, lunchId, dinnerId } = req.body;
    const mealPlan = await DailyMealPlan.create({ date, breakfastId, lunchId, dinnerId });
    res.status(201).json(mealPlan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getDailyMealPlans,
  createDailyMealPlan,
};