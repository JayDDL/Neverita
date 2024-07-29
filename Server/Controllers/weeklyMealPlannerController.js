const { WeeklyMealPlan } = require('../models');

// Get weekly meal plans by start date
const getWeeklyMealPlans = async (req, res) => {
  try {
    const { startDate } = req.query;
    if (!startDate) {
      return res.status(400).json({ error: 'startDate query parameter is required' });
    }

    const weekStartDate = new Date(startDate);
    const weekEndDate = new Date(weekStartDate);
    weekEndDate.setDate(weekStartDate.getDate() + 6);

    const mealPlan = await WeeklyMealPlan.findOne({
      where: { weekStartDate },
    });

    if (!mealPlan) {
      return res.status(404).json({ error: 'Weekly meal plan not found' });
    }

    res.json(mealPlan);
  } catch (error) {
    console.error('Error fetching weekly meal plans:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create or update a weekly meal plan
const saveWeeklyMealPlan = async (req, res) => {
  try {
    const { weekStartDate, weekEndDate, monday, tuesday, wednesday, thursday, friday, saturday, sunday } = req.body;

    if (!weekStartDate || !weekEndDate) {
      return res.status(400).json({ error: 'weekStartDate and weekEndDate are required' });
    }

    const [mealPlan, created] = await WeeklyMealPlan.findOrCreate({
      where: { weekStartDate },
      defaults: { weekEndDate, monday, tuesday, wednesday, thursday, friday, saturday, sunday },
    });

    if (!created) { // if mealPlan is not newly created
      await mealPlan.update({ weekEndDate, monday, tuesday, wednesday, thursday, friday, saturday, sunday });
    }

    res.status(201).json({ message: 'Weekly meal plan saved successfully' });
  } catch (error) {
    console.error('Error saving weekly meal plan:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getWeeklyMealPlans,
  saveWeeklyMealPlan,
};