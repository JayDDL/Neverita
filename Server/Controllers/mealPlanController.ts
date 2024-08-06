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

export const getAllMealPlansController = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const { userId } = req.params;
		const userIdNum = Number(userId);
		const mealPlans = await getAllMealPlansModel(userIdNum);
		res.status(200).json(mealPlans);
	} catch (error) {
		const typedError = error as Error;
		res.status(500).json({ error: typedError.message });
	}
};

export const getMealPlanByDateController = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const { userId, date } = req.params;
		const userIdNum = Number(userId);
		const dateNum = new Date(Number(date));

		const mealPlan = await getMealPlanByDateModel(userIdNum, dateNum);
		res.status(200).json(mealPlan);
	} catch (error) {
		const typedError = error as Error;
		res.status(500).json({ error: typedError.message });
	}
};

export const getWeeklyMealPlanController = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const { userId, date } = req.params;
		const userIdNum = Number(userId);
		const startDate = new Date(Number(date));
		const endDate = getEndDate(startDate);
		const weeklyMealPlan = await getWeeklyMealPlanModel(
			userIdNum,
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
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const { userId } = req.params;
		const userIdNum = Number(userId);
		const mealPlan = await createMealPlanModel(userIdNum, req.body);
		res.status(201).json(mealPlan);
	} catch (error) {
		const typedError = error as Error;
		res.status(500).json({ error: typedError.message });
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
		const typedError = error as Error;
		res.status(500).json({ error: typedError.message });
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
		const typedError = error as Error;
		res.status(500).json({ error: typedError.message });
	}
};
