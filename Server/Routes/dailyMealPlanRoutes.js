const express = require('express');
const dailyMealPlanRouter = express.Router();
const { getDailyMealPlans, createDailyMealPlan } = require('../Controllers/dailyMealPlannerController');

// Get meal plan by date
dailyMealPlanRouter.get('/', getDailyMealPlans);

// Create a new meal plan
dailyMealPlanRouter.post('/', createDailyMealPlan);

module.exports = dailyMealPlanRouter;