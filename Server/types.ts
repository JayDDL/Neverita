import type { Request } from "express";

export interface RecipeIngredientType {
	cookingMethod: string;
	preparationType: string;
	quantity: string;
	userId?: number;
	id?: number;
}

export interface IngredientType extends RecipeIngredientType {
	name: string;
}

export interface RecipeType {
	name: string;
	description: string;
	userId?: number;
}

export interface MealPlanUpdateType {
	userId?: number;
	breakfastId: number;
	lunchId: number;
	dinnerId: number;
}

export interface MealPlanInputType extends MealPlanUpdateType {
	date: Date;
}

export interface UserIdType {
	id: number;
	iat?: number;
	exp?: number;
}
