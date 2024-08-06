export type Ingredient = {
  Ingredients: innerIngredient
  quantity: string;
  preparationType: string;
  cookingMethod: string;
}

export type normalIngredient = {
  name: string;
  quantity: string;
  preparationType: string;
  cookingMethod: string;
}

export type innerIngredient = {
  id: number;
  name: string;
  userId: 1
}

export type Recipe = {
  id:number;
  name: string;
  description: string;
  recipeIngredient: Ingredient[];
}

export type SelectedMeals = {
  breakfast: Recipe | null;
  lunch:  Recipe |  null;
  dinner: Recipe |  null;
}

export type DailyMealPlan = {
  date?:number;
  breakfastId?:number | null;
  lunchId?: number | null;
  dinnerId?: number | null;
}

export type RecipeProps = {
  onViewClick : (arg0:number) => void;
  recipes: Recipe[]
}