const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models'); // Sequelize models

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const mealPlanRoutes = require('./routes/mealPlanRoutes');
const dailyMealPlanRoutes = require('./Routes/dailyMealPlanRoutes'); // Add this line

app.use('/users', userRoutes);
app.use('/recipes', recipeRoutes);
app.use('/mealplans', mealPlanRoutes);
app.use('/daily-meal-plans', dailyMealPlanRoutes); // Add this line

// Sync database and start server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀🚀🚀🚀🚀 Server is running on http://localhost:${PORT} 🚀🚀🚀🚀🚀`);
  });
});
