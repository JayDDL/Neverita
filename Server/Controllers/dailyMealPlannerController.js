// Import the DailyMealPlan and Recipe models from the models directory
const { DailyMealPlan, Recipe } = require('../models');

/**
 * Retrieves all daily meal plans including their associated recipes.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the retrieved meal plans.
 * @throws {Error} - If there is an error while retrieving the meal plans.
 */
const getDailyMealPlans = async (req, res) => {
  try {
    // Fetch all daily meal plans including their associated recipes
    const mealPlans = await DailyMealPlan.findAll({
      include: [
        { model: Recipe, as: 'breakfast' }, // Include the breakfast recipe
        { model: Recipe, as: 'lunch' }, // Include the lunch recipe
        { model: Recipe, as: 'dinner' }, // Include the dinner recipe
      ],
    });
    res.status(200).json(mealPlans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Retrieves a daily meal plan by date including its associated recipes.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the retrieved meal plan.
 * @throws {Error} - If there is an error while retrieving the meal plan.
 */
const getDailyMealPlanByDate = async (req, res) => {
  try {
    const { date } = req.params;
    // Fetch the daily meal plan for the specified date including its associated recipes
    const mealPlan = await DailyMealPlan.findOne({
      where: { date },
      include: [
        { model: Recipe, as: 'breakfast' }, // Include the breakfast recipe
        { model: Recipe, as: 'lunch' }, // Include the lunch recipe
        { model: Recipe, as: 'dinner' }, // Include the dinner recipe
      ],
    });
    if (mealPlan) {
      res.status(200).json(mealPlan);
    } else {
      res.status(404).json({ error: 'Meal plan not found for the specified date' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Creates a new daily meal plan with the provided data.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the meal plan is created.
 */
const createDailyMealPlan = async (req, res) => {
  try {
    // Destructure the date, breakfastId, lunchId, and dinnerId from the request body
    const { date, breakfastId, lunchId, dinnerId } = req.body;
    // Create a new daily meal plan with the provided data
    const mealPlan = await DailyMealPlan.create({ date, breakfastId, lunchId, dinnerId });
    res.status(201).json(mealPlan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export the getDailyMealPlans, getDailyMealPlanByDate, and createDailyMealPlan functions
module.exports = {
  getDailyMealPlans,
  getDailyMealPlanByDate,
  createDailyMealPlan,
};
