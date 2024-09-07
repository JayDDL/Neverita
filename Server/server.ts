import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { sequelize } from './Models.ts';
// Routes
import recipeRoutes from './Routes.ts/recipeRoutes';
import mealPlanRoutes from './Routes.ts/mealPlanRoutes';
import dailyMealPlanRoutes from './Routes.ts/dailyMealPlanRoutes';
import weeklyMealPlanRoutes from './Routes.ts/weeklyMealPlannerRoutes';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
// app.use('/users', userRoutes);
app.use('/recipes', recipeRoutes);
app.use('/mealplans', mealPlanRoutes);
app.use('/daily-meal-plans', dailyMealPlanRoutes);
app.use('/weekly-meal-plans', weeklyMealPlanRoutes);

// Sync database and start server if not in test environment
if (process.env.NODE_ENV !== 'test') {
  sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log(`🚀🚀🚀🚀🚀 Server is running on http://localhost:${PORT} 🚀🚀🚀🚀🚀`);
    });
  });
}

export default app;