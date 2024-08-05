import type { Request, Response } from "express";
import {
	createRecipeAndIngredientsModel,
	deleteRecipeByIdModel,
	getAllRecipesModel,
	getRecipeByIdModel,
} from "../models/recipeModels";

export const getAllRecipesController = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const { userId } = req.params;
		const userIdNum = Number(userId);
		const recipes = await getAllRecipesModel(userIdNum);
		res.status(200).json(recipes);
	} catch (error) {
		const typedError = error as Error;
		res.status(500).json({ error: typedError.message });
	}
};

// Function to get a recipe by its ID
export const getRecipeByIdController = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const { userId, recipeId } = req.params;

		const userIdNum = Number(userId);
		const recipeIdNum = Number(recipeId);

		const recipe = await getRecipeByIdModel(userIdNum, recipeIdNum);
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
	req: Request,
	res: Response,
) => {
	try {
		const { userId, recipeId } = req.params;
		const userIdNum = Number(userId);
		const recipeIdNum = Number(recipeId);

		const deletedRecipe = deleteRecipeByIdModel(userIdNum, recipeIdNum);
		res.status(200).json(deletedRecipe);
	} catch (err) {
		const typedError = err as Error;
		res.status(500).json({ error: typedError.message });
	}
};

export const createRecipeController = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const { userId } = req.params;
		const userIdNum = Number(userId);
		const { recipe, ingredients } = req.body;

		const newRecipe = await createRecipeAndIngredientsModel(
			userIdNum,
			recipe,
			ingredients,
		);

		const newRecipeData = await getRecipeByIdModel(userIdNum, newRecipe.id);
		res.status(201).json(newRecipeData);
	} catch (error) {
		const typedError = error as Error;
		res.status(500).json({ error: typedError.message });
	}
};
