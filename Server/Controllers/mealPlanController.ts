// Import the MealPlan model from the models directory
import type { Request, Response } from "express";
import {
	createMealPlanModel,
	deleteMealPlanModel,
	getAllMealPlansModel,
	getMealPlanByDateModel,
	getWeeklyMealPlanModel,
	updateMealPlanModel,
} from "../models/mealPlanModels";
import { getEndDate } from "../utils";
import type { AuthRequest } from "../types";

export const getAllMealPlansController = async (
	req: AuthRequest,
	res: Response,
): Promise<void> => {
	try {
		const userId = req.user;
		const mealPlans = await getAllMealPlansModel(userId);
		res.status(200).json(mealPlans);
	} catch (error) {
		const typedError = error as Error;
		res.status(500).json({ error: typedError.message });
	}
};

export const getMealPlanByDateController = async (
	req: AuthRequest,
	res: Response,
): Promise<void> => {
	try {
		const userId = req.user;
		const { date } = req.params;
		const dateNum = new Date(Number(date));

		const mealPlan = await getMealPlanByDateModel(userId, dateNum);
		res.status(200).json(mealPlan);
	} catch (error) {
		const typedError = error as Error;
		res.status(500).json({ error: typedError.message });
	}
};

export const getWeeklyMealPlanController = async (
	req: AuthRequest,
	res: Response,
): Promise<void> => {
	try {
		const userId = req.user;
		const { date } = req.params;
		const startDate = new Date(Number(date));
		const endDate = getEndDate(startDate);
		const weeklyMealPlan = await getWeeklyMealPlanModel(
			userId,
			startDate,
			endDate,
		);
		res.status(200).send(weeklyMealPlan);
	} catch (error) {
		const typedError = error as Error;
		res.status(500).json({ error: typedError.message });
	}
};

export const createMealPlanController = async (
	req: AuthRequest,
	res: Response,
): Promise<void> => {
	try {
		const userId = req.user;
		const mealPlan = await createMealPlanModel(userId, req.body);
		res.status(201).json(mealPlan);
	} catch (error) {
		const typedError = error as Error;
		res.status(500).json({ error: typedError.message });
	}
};

// ! Update Meal Plan Controller
export const updateMealPlanController = async (
	req: AuthRequest,
	res: Response,
): Promise<void> => {
	try {
		const userId = req.user;
		const { mealPlanId } = req.params;
		const mealPlanIdNum = Number(mealPlanId);

		const mealPlan = await updateMealPlanModel(userId, mealPlanIdNum, req.body);
		res.status(201).json(mealPlan);
	} catch (error) {
		const typedError = error as Error;
		res.status(500).json({ error: typedError.message });
	}
};

// ! Delete Meal Plan Controller
// * Remove Meal Plan by Id
export const deleteMealPlanController = async (
	req: AuthRequest,
	res: Response,
): Promise<void> => {
	try {
		const userId = req.user;
		const { mealPlanId } = req.params;
		const mealPlanIdNum = Number(mealPlanId);

		await deleteMealPlanModel(userId, mealPlanIdNum);
		res.status(200).json({ message: "Meal plan deleted successfully" });
	} catch (error) {
		const typedError = error as Error;
		res.status(500).json({ error: typedError.message });
	}
};
