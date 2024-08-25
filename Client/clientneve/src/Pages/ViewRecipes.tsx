import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewRecipes.css";
import { Recipe } from "../Types/type";
import RecipeList from "../Components/RecipeList";

// Define the ViewRecipes functional component
const ViewRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:3000/recipes");

        if (response.ok) {
          const data = await response.json();
          setRecipes(data);
        } else {
          console.error(
            "Failed to fetch recipes, status code:",
            response.status
          );
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);
  const handleViewClick = (id: number) => {
    navigate(`/recipe/${id}`);
  };

  return (
    <div className="container">
      <h1>Recipes</h1>
      <RecipeList recipes={recipes} onViewClick={handleViewClick} />
    </div>
  );
};

export default ViewRecipes;
