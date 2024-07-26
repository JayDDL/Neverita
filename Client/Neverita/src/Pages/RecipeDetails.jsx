import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetails = () => {
  const { id } = useParams(); // Get the recipe ID from the URL
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:5000/recipes/${id}`);
        if (response.ok) {
          const data = await response.json();
          setRecipe(data);
        } else {
          console.error('Failed to fetch recipe details, status code:', response.status);
        }
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{recipe.name}</h1>
      <h2>Description</h2>
      <p>{recipe.description}</p>
      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.name} - {ingredient.quantity} - {ingredient.preparationMethod} - {ingredient.cookingMethod}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeDetails;