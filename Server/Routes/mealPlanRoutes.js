const express = require('express'); // Import the Express module
const { getAllMealPlans, createMealPlan } = require('../Controllers/mealPlanController'); // Import the controller functions for meal plans

const mealPlanRouter = express.Router(); // Create a new router object for meal plans

mealPlanRouter.get('/', async (req, res) => { // Define a route to get all meal plans
  try {
    await getAllMealPlans(req, res); // Call the getAllMealPlans function
  } catch (error) {
    res.status(500).send(error.message); // Send a 500 error response if an error occurs
  }
});

mealPlanRouter.post('/', async (req, res) => { // Define a route to create a new meal plan
  try {
    await createMealPlan(req, res); // Call the createMealPlan function
  } catch (error) {
    res.status(500).send(error.message); // Send a 500 error response if an error occurs
  }
});

module.exports = mealPlanRouter; // Export the mealPlanRouter
