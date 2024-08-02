import express from "express";
import {
	getAllMealPlans,
	createMealPlan,
} from "../Controllers/mealPlanController";

export const mealPlanRouter = express.Router();

// Define a route to get all meal plans
mealPlanRouter.get("/", getAllMealPlans);

// Define a route to create a new meal plan
mealPlanRouter.post("/", createMealPlan);
