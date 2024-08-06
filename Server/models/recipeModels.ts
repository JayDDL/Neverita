import type { IngredientType, RecipeType } from "../types";
import { prisma } from "./prisma";

export const getAllRecipesModel = async (userId: number) => {
	try {
		const recipes = await prisma.recipe.findMany({
			where: {
				userId,
			},
		});
		return recipes;
	} catch (error) {
		console.error("Error fetching recipes:", error);
		throw new Error("Could not fetch recipes");
	}
};

export const getRecipeByIdModel = async (userId: number, recipeId: number) => {
	try {
		const recipe = await prisma.recipe.findUnique({
			where: {
				userId,
				id: recipeId,
			},
			include: {
				recipeIngredient: {
					include: {
						Ingredients: true,
					},
				},
			},
		});
		return recipe;
	} catch (error) {
		console.error("Error fetching recipe by ID:", error);
		throw new Error("Could not fetch recipe by ID");
	}
};

export const deleteRecipeByIdModel = async (
	userId: number,
	recipeId: number,
) => {
	try {
		const deletedRecipe = await prisma.recipe.delete({
			where: {
				userId,
				id: recipeId,
			},
		});
		return deletedRecipe;
	} catch (error) {
		console.error("Error deleting recipe by ID:", error);
		throw new Error("Could not delete recipe by ID");
	}
};

// ! Improve this by wrapping all DB operations in a transaction
export const createRecipeAndIngredientsModel = async (
	userId: number,
	recipe: RecipeType,
	ingredients: IngredientType[],
) => {
	try {
		const newRecipe = await createRecipeModel(userId, recipe);

		const ingredientsArrWithUserId = ingredients.map((ingredient) => {
			ingredient.userId = userId;
			return ingredient;
		});

		// Filter ingredients array of objects to only properties: name & userId
		const filteredIngredientsArr = ingredientsArrWithUserId.map(
			(ingredient) => {
				return {
					userId: ingredient.userId,
					name: ingredient.name,
				};
			},
		);

		// Create ingredients in the database using `filteredIngredientsArr`
		const addIngredients = await prisma.ingredient.createManyAndReturn({
			data: filteredIngredientsArr,
			skipDuplicates: true,
		});

		// Add the corresponding Ingredient Id to the Ingredient for it to be added to the RecipeIngredient table
		// biome-ignore lint/complexity/noForEach: <explanation>
		ingredientsArrWithUserId.forEach((ingredient: IngredientType) =>
			// biome-ignore lint/complexity/noForEach: <explanation>
			addIngredients.forEach((ingredientAdded) => {
				if (ingredientAdded.name === ingredient.name)
					ingredient.id = ingredientAdded.id;
			}),
		);

		const ingredientRecipeData = ingredientsArrWithUserId.map((ingredient) => {
			return {
				cookingMethod: ingredient.cookingMethod,
				preparationType: ingredient.preparationType,
				ingredientsId: ingredient.id,
				quantity: ingredient.quantity,
				recipeId: newRecipe.id,
			};
		});

		await prisma.recipeIngredient.createManyAndReturn({
			data: ingredientRecipeData,
		});

		return newRecipe;
	} catch (error) {
		console.error("Error creating recipe and ingredients:", error);
		throw new Error("Could not create recipe and ingredients");
	}
};

export const createRecipeModel = async (userId: number, recipe: RecipeType) => {
	recipe.userId = userId;
	return await prisma.recipe.create({
		data: recipe,
	});
};
