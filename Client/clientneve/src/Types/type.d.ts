export interface Meal {
  id: string;
  name: string;
}

export type MealType = "breakfast" | "lunch" | "dinner";

export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: Ingredients[];
}

export interface Ingredients {
  name: string;
  weight: string;
  cookingMethod: string;
  preparationType: string;
}

export interface MealPlan {
  breakfast: Meal | "";
  lunch: Meal | "";
  dinner: Meal | "";
}

export interface Week {
  startDate: string;
  days: Date[];
}
