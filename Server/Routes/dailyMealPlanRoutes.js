const express = require('express');
const dailyMealPlanRouter = express.Router();
const DailyMealPlan = require('../models/dailyMealPlan');
const Recipe = require('../models/recipe');

// Get meal plan by date
router.get('/', async (req, res) => {
  const { date } = req.query;
  try {
    const mealPlan = await DailyMealPlan.findOne({
      where: { date },
      include: [
        { model: Recipe, as: 'breakfast' },
        { model: Recipe, as: 'lunch' },
        { model: Recipe, as: 'dinner' },
      ],
    });
    res.json(mealPlan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new meal plan
router.post('/', async (req, res) => {
  const { date, breakfastId, lunchId, dinnerId } = req.body;
  try {
    const newMealPlan = await DailyMealPlan.create({ date, breakfastId, lunchId, dinnerId });
    res.json(newMealPlan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;