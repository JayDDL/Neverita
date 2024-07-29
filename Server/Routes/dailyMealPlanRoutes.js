// Import the Express module
const express = require('express'); // Import the Express module
const dailyMealPlanRouter = express.Router(); // Create a new router object for daily meal plans

// Import the controller functions for daily meal plans
const { getDailyMealPlans, createDailyMealPlan, getDailyMealPlanByDate } = require('../Controllers/dailyMealPlannerController'); // Import the controller functions for daily meal plans

dailyMealPlanRouter.get('/', getDailyMealPlans); // Define a route to get all meal plans
dailyMealPlanRouter.get('/:date', getDailyMealPlanByDate); // Define a route to get meal plan by date
dailyMealPlanRouter.post('/', createDailyMealPlan); // Define a route to create a new meal plan

module.exports = dailyMealPlanRouter; // Export the dailyMealPlanRouter
