import "./RecipeList.css";
import React from "react";
import { Recipe } from "../Types/type";

interface RecipeListProps {
  recipes: Recipe[];
  onViewClick: (id: number) => void;
}

// Define the RecipeList functional component, which takes recipes and onViewClick as props
const RecipeList: React.FC<RecipeListProps> = ({ recipes, onViewClick }) => {
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="recipe-item">
          <div>
            <h2 className="recipe-title">{recipe.name}</h2>
            <p className="recipe-description">{recipe.description}</p>
          </div>
          <button onClick={() => onViewClick(recipe.id)}>View</button>
        </div>
      ))}
    </div>
  );
};
// Export the RecipeList component as the default export
export default RecipeList;
