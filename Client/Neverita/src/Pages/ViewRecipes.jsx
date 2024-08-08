// Import necessary hooks from 'react' and 'react-router-dom'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeList from '../Components/RecipeList'; // Import the RecipeList component
import './ViewRecipes.css';

// Define the ViewRecipes functional component
const ViewRecipes = () => {
  const [recipes, setRecipes] = useState([]); // State for storing the list of recipes
  const navigate = useNavigate(); // Hook to programmatically navigate between routes

  // useEffect hook to fetch recipes when the component mounts
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:3000/recipes');
        if (response.ok) {
          const data = await response.json();
          setRecipes(data); // Set the fetched recipes data to the state
        } else {
          console.error('Failed to fetch recipes, status code:', response.status); // Log error if request failed
        }
      } catch (error) {
        console.error('Error fetching recipes:', error); // Log any error that occurs during the request
      }
    };

    fetchRecipes(); // Call the function to fetch the recipes
  }, []); // Empty dependency array to run the effect only once

  // Function to handle clicking the view button for a recipe
  const handleViewClick = (id) => {
    navigate(`/recipe/${id}`); // Navigate to the recipe details page for the selected recipe
  };

  // Return the JSX for rendering the ViewRecipes component
  return (
    <div className="container">
      <h1>Recipes</h1>
      <RecipeList recipes={recipes} onViewClick={handleViewClick} /> {/* Render the RecipeList component */}
    </div>
  );
};

export default ViewRecipes; // Export the ViewRecipes component as the default export
