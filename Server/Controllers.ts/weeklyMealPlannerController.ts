import { Request, Response } from 'express';
import { WeeklyMealPlan } from '../Models.ts/weeklyMealPlanner';
import { CreationAttributes } from 'sequelize';



// interface WeeklyMealPlanCreationAttributes {
//     weekStartDate: string;
//     weekEndDate: string;
//     monday: any;
//     tuesday: any;
//     wednesday: any;
//     thursday: any;
//     friday: any;
//     saturday: any;
//     sunday: any;
//   }

  type WeeklyMealPlanCreationAttributes = CreationAttributes<WeeklyMealPlan>;

  
  export const getWeeklyMealPlans = async (req: Request, res: Response): Promise<void> => {
    try {
      const { startDate } = req.query;
      if (!startDate) {
        res.status(400).json({ error: 'startDate query parameter is required' });
        return;
      }
      const weekStartDate = new Date(startDate as string);
      const weekEndDate = new Date(weekStartDate);
      weekEndDate.setDate(weekStartDate.getDate() + 6);
  
      const mealPlan = await WeeklyMealPlan.findOne({
        where: { weekStartDate },
      });
  
      if (!mealPlan) {
        res.status(404).json({ error: 'Weekly meal plan not found' });
        return;
      }
  
      res.json(mealPlan);
    } catch (error) {
      console.error('Error fetching weekly meal plans:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  export const saveWeeklyMealPlan = async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        weekStartDate,
        weekEndDate,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday
      } = req.body;
  
      if (
        !weekStartDate || !weekEndDate || !monday || !tuesday || !wednesday ||
        !thursday || !friday || !saturday || !sunday
      ) {
        res.status(400).json({ error: 'All fields are required' });
        return;
      }
  
      const mealPlanData: WeeklyMealPlanCreationAttributes = {
        weekStartDate,
        weekEndDate,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday
      };
  
      const mealPlan = await WeeklyMealPlan.create(mealPlanData);
  
      res.status(201).json(mealPlan);
    } catch (error) {
      console.error('Error saving weekly meal plan:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };