import { Router } from 'express';
import { getDailyMealPlans, createDailyMealPlan, getDailyMealPlanByDate } from '../Controllers.ts/dailyMealPlannerController';

const dailyMealPlanRouter: Router = Router();

dailyMealPlanRouter.get('/', getDailyMealPlans);
dailyMealPlanRouter.get('/:date', getDailyMealPlanByDate);
dailyMealPlanRouter.post('/', createDailyMealPlan);

export default dailyMealPlanRouter;
