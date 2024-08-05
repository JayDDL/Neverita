import * as express from "express";
import {
	getAllMealPlansController,
	createMealPlanController,
	updateMealPlanController,
	deleteMealPlanController,
	getMealPlanByDateController,
} from "../Controllers/mealPlanController";

export const mealPlanRouter = express.Router({ mergeParams: true });

mealPlanRouter.get("/", getAllMealPlansController);

mealPlanRouter.get("/:date", getMealPlanByDateController);

mealPlanRouter.post("/", createMealPlanController);

mealPlanRouter.put("/:mealPlanId", updateMealPlanController);

mealPlanRouter.delete("/:mealPlanId", deleteMealPlanController);
