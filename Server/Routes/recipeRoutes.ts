import * as express from "express";
import {
	createRecipeController,
	getAllRecipesController,
	deleteRecipeByIdController,
	getRecipeByIdController,
} from "../controllers/recipeController";

export const recipeRouter = express.Router({ mergeParams: true });

type AuthRequestHandler = (
  req: Request,
  res: Response,
  next: express.NextFunction
) => Promise<void> | void;

// GET: All recipes
recipeRouter.get("/", getAllRecipesController);

// GET: Recipe by ID
recipeRouter.get("/:recipeId", getRecipeByIdController);

// DELETE: Recipe by ID
recipeRouter.delete ("/:recipeId", deleteRecipeByIdController);

// POST: Create new recipe
recipeRouter.post("/", createRecipeController);
