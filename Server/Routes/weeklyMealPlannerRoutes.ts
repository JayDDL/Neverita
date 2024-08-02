import express from "express"; // Import the Express module
import {
	getWeeklyMealPlans,
	saveWeeklyMealPlan,
} from "../Controllers/weeklyMealPlannerController"; // Import the controller functions for weekly meal plans

export const weeklyMealPlanRouter = express.Router(); // Create a new router object for weekly meal plans

// Define a route to get weekly meal plans
weeklyMealPlanRouter.get("/", getWeeklyMealPlans);

// Define a route to create or update a weekly meal plan
weeklyMealPlanRouter.post("/", saveWeeklyMealPlan);
