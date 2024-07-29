// Import the WeeklyMealPlan model from the models directory
const { WeeklyMealPlan } = require('../models');

// Function to get weekly meal plans by start date
const getWeeklyMealPlans = async (req, res) => {
  try {
    const { startDate } = req.query; // Get the startDate from the query parameters
    if (!startDate) {
      return res.status(400).json({ error: 'startDate query parameter is required' }); // Return error if startDate is not provided
    }
    const weekStartDate = new Date(startDate); // Parse the startDate
    const weekEndDate = new Date(weekStartDate);
    weekEndDate.setDate(weekStartDate.getDate() + 6); // Calculate the end date of the week
    const mealPlan = await WeeklyMealPlan.findOne({
      where: { weekStartDate }, // Find the meal plan by start date
    });
    if (!mealPlan) {
      return res.status(404).json({ error: 'Weekly meal plan not found' }); // Return error if no meal plan is found
    }
    res.json(mealPlan); // Return the found meal plan
  } catch (error) {
    console.error('Error fetching weekly meal plans:', error); // Log any errors
    res.status(500).json({ error: 'Internal server error' }); // Return a 500 error response
  }
};

// Function to create or update a weekly meal plan
const saveWeeklyMealPlan = async (req, res) => {
  try {
    const { weekStartDate, weekEndDate, monday, tuesday, wednesday, thursday, friday, saturday, sunday } = req.body;

    if (!weekStartDate || !weekEndDate) {
      return res.status(400).json({ error: 'weekStartDate and weekEndDate are required' }); // Return error if startDate or endDate are not provided
    }
    const [mealPlan, created] = await WeeklyMealPlan.findOrCreate({
      where: { weekStartDate }, // Find or create the meal plan by start date
      defaults: { weekEndDate, monday, tuesday, wednesday, thursday, friday, saturday, sunday }, // Set the default values if creating
    });
    if (!created) { // If the meal plan was not newly created, update it
      await mealPlan.update({ weekEndDate, monday, tuesday, wednesday, thursday, friday, saturday, sunday });
    }
    res.status(201).json({ message: 'Weekly meal plan saved successfully' }); // Return a success message
  } catch (error) {
    console.error('Error saving weekly meal plan:', error); // Log any errors
    res.status(500).json({ error: 'Internal server error' }); // Return a 500 error response
  }
};

// Export the getWeeklyMealPlans and saveWeeklyMealPlan functions
module.exports = {
  getWeeklyMealPlans,
  saveWeeklyMealPlan,
};
