import { useEffect, useState } from 'react';
import RecipeList from '../Components/RecipeList';

const ViewRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:5000/recipes');
        if (response.ok) {
          const data = await response.json();
          setRecipes(data);
        } else {
          console.error('Failed to fetch recipes, status code:', response.status);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div>
      <h1>View Recipes</h1>
      <RecipeList recipes={recipes} />
    </div>
  );
};

export default ViewRecipes;