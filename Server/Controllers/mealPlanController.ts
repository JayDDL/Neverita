// Import the MealPlan model from the models directory
const { MealPlan } = require("../models");
import express, { type Request, type Response } from "express";

// Function to get all meal plans
const getAllMealPlans = async (req: Request, res: Response): Promise<void> => {
	try {
		// Fetch all meal plans
		const mealPlans = await MealPlan.findAll();
		res.status(200).json(mealPlans); // Returns all meal plans
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Function to create a new meal plan
const createMealPlan = async (req: Request, res: Response): Promise<void> => {
	try {
		// Create a new meal plan with the data from the request body
		const mealPlan = await MealPlan.create(req.body);
		res.status(201).json(mealPlan); // Creates a meal plan
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Export the getAllMealPlans and createMealPlan functions
module.exports = { getAllMealPlans, createMealPlan };
