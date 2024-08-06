import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./RecipeDetails.css";
import { Recipe } from "../Types/type";

const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>(); // Get the recipe ID from the URL parameters
  const [recipe, setRecipe] = useState<Recipe | null>(null); // State to store the recipe details

  // Fetch recipe details when the component mounts or when the ID changes
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:5000/recipes/${id}`);
        if (response.ok) {
          const data: Recipe = await response.json();
          setRecipe(data); // Set the fetched recipe data to the state
        } else {
          console.error(
            "Failed to fetch recipe details, status code:",
            response.status
          );
        }
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    fetchRecipe();
  }, [id]); // Dependency array includes `id` so it refetches if the ID changes

  // Show a loading message if the recipe data is not yet available
  if (!recipe) {
    return <div>Loading recipe...</div>;
  }

  return (
    <div className="recipe-details">
      <h1>{recipe.name}</h1>
      <h2>Description</h2>
      <p>{recipe.description}</p>
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
          {recipe.ingredients.map((ingredient, index) => (
            <tr key={index}>
              <td>{ingredient.name}</td>
              <td>{ingredient.weight}</td>
              <td>{ingredient.preparationType}</td>
              <td>{ingredient.cookingMethod}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecipeDetails;
