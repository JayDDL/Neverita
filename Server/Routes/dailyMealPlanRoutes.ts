import express from "express";
import {
	getDailyMealPlans,
	createDailyMealPlan,
	getDailyMealPlanByDate,
} from "../Controllers/dailyMealPlannerController";

export const dailyMealPlanRouter = express.Router();

// Define a route to get all meal plans
dailyMealPlanRouter.get("/", getDailyMealPlans);

// Define a route to get meal plan by date
dailyMealPlanRouter.get("/:date", getDailyMealPlanByDate);

// Define a route to create a new meal plan
dailyMealPlanRouter.post("/", createDailyMealPlan);
