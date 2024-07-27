import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateRecipe.css'; // Import the CSS file

const CreateRecipe = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredientName, setIngredientName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [preparationMethod, setPreparationMethod] = useState('');
  const [cookingMethod, setCookingMethod] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const navigate = useNavigate();

  const handleAddIngredient = () => {
    const newIngredient = {
      name: ingredientName,
      weight: quantity,
      preparationType: preparationMethod,
      cookingMethod: cookingMethod,
    };

    setIngredients([...ingredients, newIngredient]);
    setIngredientName('');
    setQuantity('');
    setPreparationMethod('');
    setCookingMethod('');
  };

  const handleAddRecipe = async () => {
    const newRecipe = {
      name,
      description,
      ingredients,
    };

    try {
      const response = await fetch('http://localhost:5000/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecipe),
      });

      if (response.ok) {
        alert('Recipe added successfully');
        navigate('/view-recipes');
      } else {
        console.error('Failed to add recipe, status code:', response.status);
      }
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  return (
    <div className="container">
      <h1>Create Recipe</h1>
      <div className="form-group">
        <label>
          Recipe Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          Recipe Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
      </div>
      <div className="ingredient-section">
        <h2>Add Ingredients</h2>
        <div className="ingredient-form">
          <label>
            Ingredient Name:
            <input
              type="text"
              value={ingredientName}
              onChange={(e) => setIngredientName(e.target.value)}
            />
          </label>
          <label>
            Quantity:
            <input
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </label>
          <label>
            Preparation Method:
            <input
              type="text"
              value={preparationMethod}
              onChange={(e) => setPreparationMethod(e.target.value)}
            />
          </label>
          <label>
            Cooking Method:
            <input
              type="text"
              value={cookingMethod}
              onChange={(e) => setCookingMethod(e.target.value)}
            />
          </label>
          <button onClick={handleAddIngredient}>Add Ingredient</button>
        </div>
      </div>
      <div className="ingredient-list">
        <h2>Ingredients List</h2>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient.name} - {ingredient.weight} - {ingredient.preparationType} - {ingredient.cookingMethod}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleAddRecipe}>Add Recipe</button>
    </div>
  );
};

export default CreateRecipe;