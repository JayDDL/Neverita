import { Sequelize } from 'sequelize-typescript';
import { User } from './User';
import { Recipe } from './recipe';
import { MealPlan } from './mealPlan';
import { DailyMealPlan } from './dailyMealPlanner';
import { WeeklyMealPlan } from './weeklyMealPlanner';

const sequelize = new Sequelize({
  dialect: 'postgres',
  models: [User, Recipe, MealPlan, DailyMealPlan, WeeklyMealPlan],
  username: "stepheno",
  password: "password",
  database: "mealplans",
  host: "127.0.0.1",
});

export { sequelize, User, Recipe, MealPlan, DailyMealPlan, WeeklyMealPlan };
