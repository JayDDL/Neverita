import { Request, Response } from 'express';
import { DailyMealPlan, Recipe } from '../Models.ts/';

export const getDailyMealPlans = async (req: Request, res: Response): Promise<void> => {
  try {
    const mealPlans = await DailyMealPlan.findAll({
      include: [
        { model: Recipe, as: 'breakfast' },
        { model: Recipe, as: 'lunch' },
        { model: Recipe, as: 'dinner' },
      ],
    });
    res.status(200).json(mealPlans);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getDailyMealPlanByDate = async (req: Request, res: Response): Promise<void> => {
  try {
    const { date } = req.params;
    const mealPlan = await DailyMealPlan.findOne({
      where: { date },
      include: [
        { model: Recipe, as: 'breakfast' },
        { model: Recipe, as: 'lunch' },
        { model: Recipe, as: 'dinner' },
      ],
    });
    if (mealPlan) {
      res.status(200).json(mealPlan);
    } else {
      res.status(404).json({ error: 'Meal plan not found for the specified date' });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const createDailyMealPlan = async (req: Request, res: Response): Promise<void> => {
  try {
    const { date, breakfastId, lunchId, dinnerId } = req.body;
    const mealPlan = await DailyMealPlan.create({ date, breakfastId, lunchId, dinnerId });
    res.status(201).json(mealPlan);
  } catch (error) {
    console.error('Error creating DailyMealPlan:', error);
    res.status(500).json({ error: 'Failed to create DailyMealPlan' });
  }
};
