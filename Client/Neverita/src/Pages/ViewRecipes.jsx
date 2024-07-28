import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeList from '../Components/RecipeList';
import './ViewRecipes.css';

const ViewRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

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

  const handleViewClick = (id) => {
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