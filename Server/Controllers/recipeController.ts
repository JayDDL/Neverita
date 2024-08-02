import type { Request, Response } from "express";
import Recipe from "../models";

// Function to get all recipes
export const getAllRecipes = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		// Fetch all recipes
		const recipes = await Recipe.findAll();
		res.status(200).json(recipes); // Returns all recipes
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Function to get a recipe by its ID
export const getRecipeById = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		// Fetch the recipe by its primary key (ID)
		const recipe = await Recipe.findByPk(req.params.id);
		if (recipe) {
			res.status(200).json(recipe);
		} else {
			// Send a 404 error response if the recipe is not found
			res.status(404).json({ error: "Recipe ID not found" });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Function to create a new recipe
export const createRecipe = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		// Create a new recipe with the data from the request body
		const recipe = await Recipe.create(req.body);
		res.status(201).json(recipe); // Creates recipe
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
