import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./RecipeDetails.css";

import { Ingredient, Recipe } from "../../types";

export const RecipeDetails = ({userId} : {userId: number}) => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [diet, setDiet] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  console.log(recipeId)

  useEffect(() => {
    const fetchRecipeAndDiet = async () => {
      setIsLoading(true);
      try {
        const recipeResponse = await fetch(
          `http://localhost:3000/user/${userId}/recipes/${recipeId}`
        );
        if (!recipeResponse.ok) {
          throw new Error(
            `Failed to fetch recipe details, status code: ${recipeResponse.status}`
          );
        }
        const recipeData = await recipeResponse.json();
        console.log(recipeData)
        setRecipe(recipeData);

        // Fetch diet
        const ingredientNames = recipeData.recipeIngredient.map(
          (ingredient: Ingredient) => ingredient.Ingredients.name
        );
        const dietResponse = await fetch("http://localhost:5001/diet", {
          method: "POST",
          body: JSON.stringify({ ingredients: ingredientNames }),
          headers: { "Content-Type": "application/json" },
        });
        if (!dietResponse.ok) {
          throw new Error(
            `Failed to fetch diet, status code: ${dietResponse.status}`
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
  }, [recipeId,userId]);

  if (isLoading) {
    return <div>Loading recipe and diet information...</div>;
  }

  if (!recipe) {
    return <div>Error loading recipe</div>;
  }

  return (
    <div className="recipe-details">
      <h1>{recipe.name}</h1>
      <h2>Description</h2>
      <p>{recipe.description}</p>
      {diet && <p>Diet: {diet}</p>}
      <h2>Ingredients</h2>
      <table className="ingredients-table">
        <thead>
          <tr>
            <th>Ingredient Name</th>
            <th>Quantity</th>
            <th>Preparation Method</th>
            <th>Cooking Method</th>
          </tr>
        </thead>
        <tbody>
          {recipe.recipeIngredient.map((ingredient, index: number) => (
            <tr key={index}>
              <td>{ingredient.Ingredients.name}</td>
              <td>{ingredient.quantity}</td>
              <td>{ingredient.preparationType}</td>
              <td>{ingredient.cookingMethod}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
