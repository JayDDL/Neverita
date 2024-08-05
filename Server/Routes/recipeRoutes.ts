import express from "express";
import {
	createRecipeController,
	getAllRecipesController,
	deleteRecipeByIdController,
	getRecipeByIdController,
} from "../Controllers/recipeController";

export const recipeRouter = express.Router({ mergeParams: true });

// GET: All recipes
recipeRouter.get("/", getAllRecipesController);

// GET: Recipe by ID
recipeRouter.get("/:recipeId", getRecipeByIdController);

// DELETE: Recipe by ID
recipeRouter.get("/:recipeId", deleteRecipeByIdController);

// POST: Create new recipe
recipeRouter.post("/", createRecipeController);
