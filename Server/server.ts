import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { sequelize } from './models';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
import userRoutes from './Routes/userRoutes';
import recipeRoutes from './Routes/recipeRoutes';
import mealPlanRoutes from './Routes/mealPlanRoutes';
import dailyMealPlanRoutes from './Routes/dailyMealPlanRoutes';
import weeklyMealPlanRoutes from './Routes/weeklyMealPlannerRoutes';

app.use('/users', userRoutes);
app.use('/recipes', recipeRoutes);
app.use('/mealplans', mealPlanRoutes);
app.use('/daily-meal-plans', dailyMealPlanRoutes);
app.use('/weekly-meal-plans', weeklyMealPlanRoutes);

// Sync database and start server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀🚀🚀🚀🚀 Server is running on http://localhost:${PORT} 🚀🚀🚀🚀🚀`);
  });
});
