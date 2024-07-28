const express = require('express');
const { getWeeklyMealPlan, createWeeklyMealPlan } = require('../Controllers/weeklyMealPlannerController');

const weeklyMealPlannerRouter = express.Router();

// GET weekly meal plan by week start date
weeklyMealPlannerRouter.get('/', async (req, res) => {
  try {
    await getWeeklyMealPlan(req, res);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// POST a new weekly meal plan
weeklyMealPlannerRouter.post('/', async (req, res) => {
  try {
    await createWeeklyMealPlan(req, res);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = weeklyMealPlannerRouter;