const express = require('express');
const weeklyMealPlanRouter = express.Router();
const { getWeeklyMealPlans, saveWeeklyMealPlan } = require('../Controllers/weeklyMealPlannerController');

weeklyMealPlanRouter.get('/', getWeeklyMealPlans);
weeklyMealPlanRouter.post('/', saveWeeklyMealPlan);

module.exports = weeklyMealPlanRouter;