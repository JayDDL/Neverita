import { Request, Response } from 'express';
import { MealPlan } from '../Models.ts';

export const getAllMealPlans = async (req: Request, res: Response): Promise<void> => {
  try {
    const mealPlans = await MealPlan.findAll();
    res.status(200).json(mealPlans);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const createMealPlan = async (req: Request, res: Response): Promise<void> => {
  try {
    const mealPlan = await MealPlan.create(req.body);
    res.status(201).json(mealPlan);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
