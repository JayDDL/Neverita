// Import necessary hooks from 'react' and 'react-router-dom'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './RecipeDetails.css';

// Define the RecipeDetails functional component
const RecipeDetails = () => {
  const { id } = useParams(); // Get the recipe ID from the URL
  const [recipe, setRecipe] = useState(null); // State for storing the recipe details

  // useEffect hook to fetch recipe details when the component mounts or when the ID changes
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:5000/recipes/${id}`);
        if (response.ok) {
          const data = await response.json();
          setRecipe(data); // Set the fetched recipe data to the state
        } else {
          console.error('Failed to fetch recipe details, status code:', response.status); // Log error if request failed
        }
      } catch (error) {
        console.error('Error fetching recipe details:', error); // Log any error that occurs during the request
      }
    };

    fetchRecipe(); // Call the function to fetch the recipe details
  }, [id]); // Dependency array with 'id' to refetch when ID changes

  // Return a loading message if the recipe data is not yet fetched
  if (!recipe) {
    return <div className="container">Loading recipe...</div>;
  }

  // Return the JSX for rendering the RecipeDetails component
  return (
    <div className="container">
      <h1>{recipe.name}</h1>
      <h2>Description</h2>
      <p>{recipe.description}</p>
      <h2>Ingredients</h2>
      <ul>
        {/* Map over the ingredients array to display each ingredient */}
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.name} - {ingredient.weight} - {ingredient.preparationType} - {ingredient.cookingMethod}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeDetails; // Export the RecipeDetails component as the default export
