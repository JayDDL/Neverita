const express = require('express'); // Import the Express module
const bodyParser = require('body-parser'); // Import the body-parser middleware
const cors = require('cors'); // Import the CORS middleware
const { sequelize } = require('./models'); // Import Sequelize models

const app = express(); // Create an instance of the Express application
const PORT = process.env.PORT || 3000; // Set the port number

// Middleware
app.use(bodyParser.json()); // Use body-parser middleware to parse JSON requests
app.use(cors()); // Use CORS middleware to enable Cross-Origin Resource Sharing

// Routes
const userRoutes = require('./Routes/userRoutes'); // Import user routes
const recipeRoutes = require('./Routes/recipeRoutes'); // Import recipe routes
const mealPlanRoutes = require('./Routes/mealPlanRoutes'); // Import meal plan routes
const dailyMealPlanRoutes = require('./Routes/dailyMealPlanRoutes'); // Import daily meal plan routes
const weeklyMealPlanRoutes = require('./Routes/weeklyMealPlannerRoutes'); // Import weekly meal plan routes

app.use('/users', userRoutes); // Use user routes for /users endpoint
app.use('/recipes', recipeRoutes); // Use recipe routes for /recipes endpoint
app.use('/mealplans', mealPlanRoutes); // Use meal plan routes for /mealplans endpoint
app.use('/daily-meal-plans', dailyMealPlanRoutes); // Use daily meal plan routes for /daily-meal-plans endpoint
app.use('/weekly-meal-plans', weeklyMealPlanRoutes); // Use weekly meal plan routes for /weekly-meal-plans endpoint

// Sync database and start server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀🚀🚀🚀🚀 Server is running on http://localhost:${PORT} 🚀🚀🚀🚀🚀`); // Log server start message
  });
});
