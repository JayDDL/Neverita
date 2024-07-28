const { DailyMealPlan, Recipe } = require('../models');

const getWeeklyMealPlans = async (req, res) => {
  try {
    const { startDate } = req.query;
    if (!startDate) {
      return res.status(400).json({ error: 'startDate query parameter is required' });
    }

    const startOfWeek = new Date(startDate);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const mealPlans = await DailyMealPlan.findAll({
      where: {
        date: {
          [Op.between]: [startOfWeek, endOfWeek],
        },
      },
      include: [
        { model: Recipe, as: 'breakfast' },
        { model: Recipe, as: 'lunch' },
        { model: Recipe, as: 'dinner' },
      ],
    });

    const formattedMealPlans = mealPlans.map(plan => ({
      day: plan.date.toLocaleDateString('en-US', { weekday: 'long' }),
      date: plan.date.toISOString().split('T')[0],
      breakfast: plan.breakfast,
      lunch: plan.lunch,
      dinner: plan.dinner,
    }));

    res.json(formattedMealPlans);
  } catch (error) {
    console.error('Error fetching weekly meal plans:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const saveWeeklyMealPlan = async (req, res) => {
  try {
    const { date, breakfastId, lunchId, dinnerId } = req.body;
    if (!date) {
      return res.status(400).json({ error: 'date is required' });
    }

    const mealPlan = await DailyMealPlan.findOrCreate({
      where: { date },
      defaults: { breakfastId, lunchId, dinnerId },
    });

    if (!mealPlan[1]) { // if mealPlan is not newly created
      await mealPlan[0].update({ breakfastId, lunchId, dinnerId });
    }

    res.status(201).json({ message: 'Meal plan saved successfully' });
  } catch (error) {
    console.error('Error saving meal plan:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getWeeklyMealPlans,
  saveWeeklyMealPlan,
};
