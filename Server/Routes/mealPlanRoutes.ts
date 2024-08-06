import * as express from "express";
import {
	getAllMealPlansController,
	createMealPlanController,
	updateMealPlanController,
	deleteMealPlanController,
	getMealPlanByDateController,
	getWeeklyMealPlanController,
} from "../controllers/mealPlanController";

export const mealPlanRouter = express.Router({ mergeParams: true });

mealPlanRouter.get("/", getAllMealPlansController);

mealPlanRouter.get("/:date", getMealPlanByDateController);

mealPlanRouter.get("/weekly/:date", getWeeklyMealPlanController);

mealPlanRouter.post("/", createMealPlanController);

mealPlanRouter.put("/:mealPlanId", updateMealPlanController);

mealPlanRouter.delete("/:mealPlanId", deleteMealPlanController);
