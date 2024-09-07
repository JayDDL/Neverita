import { Request, Response } from 'express';
import { Recipe } from '../Models.ts/recipe';


export const getAllRecipes = async (req: Request, res: Response): Promise<void> => {
  try {
    const recipes = await Recipe.findAll();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getRecipeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (recipe) {
      res.status(200).json(recipe);
    } else {
      res.status(404).json({ error: 'Recipe ID not found' });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const createRecipe = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Request body:', req.body);
    const { name, description, ingredients } = req.body;

    if (!name || typeof name !== 'string') {
      res.status(400).json({ error: 'Name is required and must be a string' });
      return;
    }
    if (!description || typeof description !== 'string') {
      res.status(400).json({ error: 'Description is required and must be a string' });
      return;
    }
    if (!Array.isArray(ingredients)) {
        res.status(400).json({ error: 'Ingredients are required and must be an array' });
        return;
      }

    // Create a new recipe
    const newRecipe = {
      title: name,
      instructions: description,
      ingredients
      //userId: null, 
    };

    const createdRecipe = await Recipe.create(newRecipe);
    res.status(201).json(createdRecipe);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: (error as Error).message });
  }
};

   