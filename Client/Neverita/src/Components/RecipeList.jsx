import './RecipeList.css';

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

export default RecipeList;