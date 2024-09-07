import { Router, Request, Response } from 'express';
import { getAllRecipes, createRecipe, getRecipeById } from '../Controllers.ts/recipeController';

const recipeRouter: Router = Router();

recipeRouter.get('/', async (req: Request, res: Response) => {
  try {
    await getAllRecipes(req, res);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

recipeRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    await getRecipeById(req, res);
  } catch (error) {
    console.log('Cannot get recipe by ID', error);
    res.status(500).send((error as Error).message);
  }
});

recipeRouter.post('/', async (req: Request, res: Response) => {
  try {
    await createRecipe(req, res);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

export default recipeRouter;
