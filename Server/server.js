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
const userRoutes = require('./Routes/userRoutes');
const recipeRoutes = require('./Routes/recipeRoutes');
const mealPlanRoutes = require('./Routes/mealPlanRoutes');

app.use('/users', userRoutes);
app.use('/recipes', recipeRoutes);
app.use('/mealplans', mealPlanRoutes);

// Sync database and start server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀🚀🚀🚀🚀 Server is running on http://localhost:${PORT} 🚀🚀🚀🚀🚀`);
  });
});
