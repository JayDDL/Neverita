import type { Request, Response } from "express";
import {
	createRecipeAndIngredientsModel,
	deleteRecipeByIdModel,
	getAllRecipesModel,
	getRecipeByIdModel,
} from "../models/recipeModels";
import type { AuthRequest } from "../types";

export const getAllRecipesController = async (
	req: AuthRequest,
	res: Response,
): Promise<void> => {
	try {
		const userId = req.user;
		console.log(userId);
		const recipes = await getAllRecipesModel(userId);
		res.status(200).json(recipes);
	} catch (error) {
		const typedError = error as Error;
		res.status(500).json({ error: typedError.message });
	}
};

// Function to get a recipe by its ID
export const getRecipeByIdController = async (
	req: AuthRequest,
	res: Response,
): Promise<void> => {
	try {
		const userId = req.user;
		const { recipeId } = req.params;
		const recipeIdNum = Number(recipeId);

		const recipe = await getRecipeByIdModel(userId, recipeIdNum);
		if (recipe) {
			res.status(200).json(recipe);
		} else {
			res.status(404).json({ error: "Recipe ID not found" });
		}
	} catch (error) {
		const typedError = error as Error;
		res.status(500).json({ error: typedError.message });
	}
};

export const deleteRecipeByIdController = async (
	req: AuthRequest,
	res: Response,
) => {
	try {
		const userId = req.user;
		const { recipeId } = req.params;
		const recipeIdNum = Number(recipeId);

		const deletedRecipe = deleteRecipeByIdModel(userId, recipeIdNum);
		res.status(200).json(deletedRecipe);
	} catch (err) {
		const typedError = err as Error;
		res.status(500).json({ error: typedError.message });
	}
};

export const createRecipeController = async (
	req: AuthRequest,
	res: Response,
): Promise<void> => {
	try {
		const userId = req.user;
		const { recipe, ingredients } = req.body;

		const newRecipe = await createRecipeAndIngredientsModel(
			userId,
			recipe,
			ingredients,
		);

		const newRecipeData = await getRecipeByIdModel(userId, newRecipe.id);
		res.status(201).json(newRecipeData);
	} catch (error) {
		const typedError = error as Error;
		res.status(500).json({ error: typedError.message });
	}
};
