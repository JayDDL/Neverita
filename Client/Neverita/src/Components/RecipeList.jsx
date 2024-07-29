import './RecipeList.css';

// Define the RecipeList functional component, which takes recipes and onViewClick as props
const RecipeList = ({ recipes, onViewClick }) => {
  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <div key={recipe.id} className="recipe-item">
          <div>
            <div className="recipe-title">{recipe.name}</div>
            <div className="recipe-description">{recipe.description}</div>
          </div>
          <button onClick={() => onViewClick(recipe.id)}>View</button>
        </div>
      ))}
    </div>
  );
};
// Export the RecipeList component as the default export
export default RecipeList;