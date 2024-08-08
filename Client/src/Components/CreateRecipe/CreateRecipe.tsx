import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { normalIngredient } from "../../types";

export const CreateRecipe = ({ userId }: { userId: number }) => {
	// Define state variables for the form fields and ingredients list
	const [name, setName] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [ingredientName, setIngredientName] = useState<string>("");
	const [quantity, setQuantity] = useState<string>("");
	const [preparationMethod, setPreparationMethod] = useState<string>("");
	const [cookingMethod, setCookingMethod] = useState<string>("");
	const [ingredients, setIngredients] = useState<normalIngredient[]>([]);
	const navigate = useNavigate();

	// Function to handle adding an ingredient to the list
	const handleAddIngredient = () => {
		// Create a new ingredient object
		const newIngredient = {
			name: ingredientName,
			quantity: quantity,
			preparationType: preparationMethod,
			cookingMethod: cookingMethod,
		};
		if (ingredientName) {
			setIngredients([...ingredients, newIngredient]);
			setIngredientName("");
			setQuantity("");
			setPreparationMethod("");
			setCookingMethod("");
		}
	};

	// Function to handle adding a new recipe
	const handleAddRecipe = async () => {
		// Create a new recipe object
		const newRecipe = {
			recipe: {
				name,
				description,
			},
			ingredients: ingredients,
		};

		if (name && description && ingredients) {
			try {
				// Send a POST request to the server to add the new recipe
				const response = await fetch("http://localhost:3000/recipes", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(newRecipe), // Send the new recipe data as JSON
				});

				// Check if the request was successful
				if (response.ok) {
					alert("Recipe added successfully"); // Show success message
					navigate("/view-recipes"); // Navigate to the view recipes page
				} else {
					console.error("Failed to add recipe, status code:", response.status); // Log error if request failed
				}
			} catch (error) {
				console.error("Error adding recipe:", error); // Log any error that occurs during the request
			}
		}
	};

	// Return the JSX for rendering the CreateRecipe component
	return (
		<div className="container">
			<h1 className="py-5 px-3 text-4xl font-extrabold">Create Recipe</h1>
			<div className=" w-full appearance-none rounded px-3 py-2 leading-tight text-gray-700 focus:outline-none">
				<div className="mb-4">
					<label
						htmlFor="recipeName"
						className="mb-2 block text-sm font-bold text-gray-700"
					>
						Recipe Name:
					</label>
					<input
						className=" w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
						type="text"
						value={name}
						id="recipeName"
						name="recipeName"
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="recipeDescription"
						className="mb-2 block text-sm font-bold text-gray-700"
					>
						Recipe Description:
					</label>
					<textarea
						className=" w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
						value={description}
						id="recipeDescription"
						name="recipeDescription"
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
				<div className="mb-4">
					<h2 className="mb-2 text-xl font-bold">Add Ingredients</h2>
					<div className="mb-2">
						<label
							htmlFor="ingredientName"
							className="mb-2 block text-sm font-bold text-gray-700"
						>
							Ingredient Name:
						</label>
						<input
							className=" w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
							type="text"
							value={ingredientName}
							id="ingredientName"
							name="ingredientName"
							onChange={(e) => setIngredientName(e.target.value)}
						/>
					</div>
					<div className="mb-2">
						<label
							htmlFor="quantity"
							className="mb-2 block text-sm font-bold text-gray-700"
						>
							Quantity:
						</label>
						<input
							className="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
							type="text"
							value={quantity}
							name="quantity"
							id="quantity"
							onChange={(e) => setQuantity(e.target.value)}
						/>
					</div>
					<div className="mb-2">
						<label
							htmlFor="preparationMethod"
							className="mb-2 block text-sm font-bold text-gray-700"
						>
							Preparation Method:
						</label>
						<input
							className="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
							type="text"
							value={preparationMethod}
							id="preparationMethod"
							name="preparationMethod"
							onChange={(e) => setPreparationMethod(e.target.value)}
						/>
					</div>
					<div className="mb-2">
						<label
							htmlFor="cookingMethod"
							className="mb-2 block text-sm font-bold text-gray-700"
						>
							Cooking Method:
						</label>
						<input
							className=" w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
							type="text"
							value={cookingMethod}
							name="cookingMethod"
							id="cookingMethod"
							onChange={(e) => setCookingMethod(e.target.value)}
						/>
					</div>
					<div className="flex flex-wrap justify-center pt-5">
						<button
							className=" rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700 focus:outline-none"
							onClick={handleAddIngredient}
						>
							Add Ingredient
						</button>
					</div>
				</div>
				<div className="mb-4">
					{ingredients.length ? (
						<h2 className="mb-2 text-xl font-bold">Ingredient List</h2>
					) : (
						<></>
					)}
					<ul>
						{ingredients.map((ingredient, index) => (
							<li key={index} className="mb-2">
								{ingredient.name} - {ingredient.quantity} -{" "}
								{ingredient.preparationType} - {ingredient.cookingMethod}
							</li>
						))}
					</ul>
				</div>
				<hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
				<div className="flex flex-wrap justify-center">
					<button
						className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700 focus:outline-none"
						onClick={handleAddRecipe}
					>
						Add Recipe
					</button>
				</div>
			</div>
		</div>
	);
};
