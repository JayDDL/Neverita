const { MealPlan } = require('../models');

const getAllMealPlans = async (req, res) => {
  try {
    const mealPlans = await MealPlan.findAll();
    res.status(200).json(mealPlans);  // Returns all meal plans
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createMealPlan = async (req, res) => {
  try {
    const mealPlan = await MealPlan.create(req.body);
    res.status(201).json(mealPlan);  // Creates a meal plan
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllMealPlans, createMealPlan };