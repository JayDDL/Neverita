const express = require('express');
const { getAllMealPlans, createMealPlan } = require('../Controllers/mealPlanController');

const mealPlanRouter = express.Router();

mealPlanRouter.get('/mealplan', async (req, res) => {
  try {
    await getAllMealPlans(req, res);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

mealPlanRouter.post('/mealplan', async (req, res) => {
  try {
    await createMealPlan(req, res);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = mealPlanRouter;