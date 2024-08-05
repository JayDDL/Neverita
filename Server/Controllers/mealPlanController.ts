// Import the MealPlan model from the models directory
const { MealPlan } = require("../models");
import type { Request, Response } from "express";
import {
	createMealPlanModel,
	deleteMealPlanModel,
	getAllMealPlansModel,
	getMealPlanByDateModel,
	updateMealPlanModel,
} from "../new-models/mealPlanModels";

// Function to get all meal plans
export const getAllMealPlansController = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const { userId } = req.params;
		const userIdNum = Number(userId);
		const mealPlans = await getAllMealPlansModel(userIdNum);
		res.status(200).json(mealPlans); // Returns all meal plans
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const getMealPlanByDateController = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const { userId, date } = req.params;
		const userIdNum = Number(userId);
		const dateNum = new Date(date);

		const mealPlan = await getMealPlanByDateModel(userIdNum, dateNum);
		res.status(200).json(mealPlan);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Function to create a new meal plan
export const createMealPlanController = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const { userId } = req.params;
		const userIdNum = Number(userId);
		const mealPlan = await createMealPlanModel(userIdNum, req.body);
		res.status(201).json(mealPlan);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// ! Update Meal Plan Controller
export const updateMealPlanController = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const { userId, mealPlanId } = req.params;
		const userIdNum = Number(userId);
		const mealPlanIdNum = Number(mealPlanId);

		const mealPlan = await updateMealPlanModel(
			userIdNum,
			mealPlanIdNum,
			req.body,
		);
		res.status(201).json(mealPlan);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// ! Delete Meal Plan Controller
// * Remove Meal Plan by Id
export const deleteMealPlanController = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const { userId, mealPlanId } = req.params;
		const userIdNum = Number(userId);
		const mealPlanIdNum = Number(mealPlanId);
		await deleteMealPlanModel(userIdNum, mealPlanIdNum);
		res.status(200).json({ message: "Meal plan deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
