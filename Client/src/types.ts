export type Ingredient = {
  name: string;
  weight: string;
  preparationType: string;
  cookingMethod: string;
}

export type Recipe = {
  id:number;
  name: string;
  description: string;
  ingredients: Ingredient[];
}

export type SelectedMeals = {
  breakfast: Recipe | string;
  lunch:  Recipe | string;
  dinner: Recipe | string;
}

export type DailyMealPlan = {
  date:string;
  breakfastId:number | string;
  lunchId: number | string;
  dinnerId: number | string;
}

export type RecipeProps = {
  onViewClick : (arg0:number) => void;
  recipes: Recipe[]
}