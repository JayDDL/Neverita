const express = require('express'); // Import the Express module
const weeklyMealPlanRouter = express.Router(); // Create a new router object for weekly meal plans
const { getWeeklyMealPlans, saveWeeklyMealPlan } = require('../Controllers/weeklyMealPlannerController'); // Import the controller functions for weekly meal plans

weeklyMealPlanRouter.get('/', getWeeklyMealPlans); // Define a route to get weekly meal plans
weeklyMealPlanRouter.post('/', saveWeeklyMealPlan); // Define a route to create or update a weekly meal plan

module.exports = weeklyMealPlanRouter; // Export the weeklyMealPlanRouter
