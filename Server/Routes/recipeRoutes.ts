import express from "express";
import {
	getAllRecipes,
	createRecipe,
	getRecipeById,
} from "../Controllers/recipeController";

export const recipeRouter = express.Router(); // Create a new router object for recipes

// GET all recipes
recipeRouter.get("/", getAllRecipes);

// GET a recipe by ID
recipeRouter.get("/:id", getRecipeById);

// POST a new recipe
recipeRouter.post("/", createRecipe);
