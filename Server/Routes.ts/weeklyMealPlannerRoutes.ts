import { Router } from 'express';
import { getWeeklyMealPlans, saveWeeklyMealPlan } from '../Controllers.ts/weeklyMealPlannerController';

const weeklyMealPlanRouter: Router = Router();

weeklyMealPlanRouter.get('/', getWeeklyMealPlans);
weeklyMealPlanRouter.post('/', saveWeeklyMealPlan);

export default weeklyMealPlanRouter;
