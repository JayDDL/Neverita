import { Sequelize } from 'sequelize-typescript';
import { User } from './User';
import { Recipe } from './recipe';
import { MealPlan } from './mealPlan';
import { DailyMealPlan } from './dailyMealPlanner';
import { WeeklyMealPlan } from './weeklyMealPlanner';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  models: [User, Recipe, MealPlan, DailyMealPlan, WeeklyMealPlan],
});

export { sequelize, User, Recipe, MealPlan, DailyMealPlan, WeeklyMealPlan };
