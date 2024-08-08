import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import type { Ingredient, Recipe } from "../../types";

export const RecipeDetails = ({ userId }: { userId: number }) => {
	const { recipeId } = useParams();
	const [recipe, setRecipe] = useState<Recipe | null>(null);
	const [diet, setDiet] = useState<string>("");
	const [isLoading, setIsLoading] = useState(true);
	console.log(recipeId);

	useEffect(() => {
		const fetchRecipeAndDiet = async () => {
			setIsLoading(true);
			try {
				const recipeResponse = await fetch(
					`http://localhost:3000/recipes/${recipeId}`,
					{ credentials: "include" },
				);
				if (!recipeResponse.ok) {
					throw new Error(
						`Failed to fetch recipe details, status code: ${recipeResponse.status}`,
					);
				}
				const recipeData = await recipeResponse.json();
				console.log(recipeData);
				setRecipe(recipeData);

				// Fetch diet
				const ingredientNames = recipeData.recipeIngredient.map(
					(ingredient: Ingredient) => ingredient.Ingredients.name,
				);
				const dietResponse = await fetch("http://localhost:5001/diet", {
					method: "POST",
					body: JSON.stringify({ ingredients: ingredientNames }),
					headers: { "Content-Type": "application/json" },
				});
				if (!dietResponse.ok) {
					throw new Error(
						`Failed to fetch diet, status code: ${dietResponse.status}`,
					);
				}
				const dietData = await dietResponse.json();
				setDiet(dietData.result);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
			setIsLoading(false);
		};
		fetchRecipeAndDiet();
	}, [recipeId, userId]);
	if (isLoading) {
		return (
			<div
				className="flex h-full flex-wrap justify-center items-center"
				role="status"
			>
				<svg
					aria-hidden="true"
					className="inline h-8 w-8 animate-spin fill-green-500 text-gray-200 dark:text-gray-600"
					viewBox="0 0 100 101"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
						fill="currentColor"
					/>
					<path
						d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
						fill="currentFill"
					/>
				</svg>
				<span className="sr-only">Loading...</span>
			</div>
		);
	}
	if (!recipe) {
		return <div>Error loading recipe</div>;
	}
	return (
		<div className="recipe-details rounded-lg bg-white p-4">
			<h1 className="mb-4 text-2xl font-bold">{recipe.name}</h1>
			<h2 className="mb-2 text-lg font-bold">Description</h2>
			<p className="mb-4">{recipe.description}</p>
			{diet && <p className="mb-4">Diet: {diet}</p>}
			<table className="ingredients-table w-full border-collapse">
				<thead>
					<tr className="bg-gray-200">
						<th className="px-4 py-2 text-left font-bold">Ingredient</th>
						<th className="px-4 py-2 text-left font-bold">Quantity</th>
						<th className="px-4 py-2 text-left font-bold">Preparation</th>
						<th className="px-4 py-2 text-left font-bold">Cooking</th>
					</tr>
				</thead>
				<tbody>
					{recipe.recipeIngredient.map((ingredient, index: number) => (
						<tr key={index} className="border-b border-gray-200">
							<td className="px-4 py-2">{ingredient.Ingredients.name}</td>
							<td className="px-4 py-2">{ingredient.quantity}</td>
							<td className="px-4 py-2">{ingredient.preparationType}</td>
							<td className="px-4 py-2">{ingredient.cookingMethod}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
