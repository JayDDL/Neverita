import { Router, Request, Response } from 'express';
import { getAllMealPlans, createMealPlan } from '../Controllers.ts/mealPlanController';

const mealPlanRouter: Router = Router();

mealPlanRouter.get('/', async (req: Request, res: Response) => {
  try {
    await getAllMealPlans(req, res);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

mealPlanRouter.post('/', async (req: Request, res: Response) => {
  try {
    await createMealPlan(req, res);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

export default mealPlanRouter;
