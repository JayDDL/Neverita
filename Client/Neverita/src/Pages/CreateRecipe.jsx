// Import necessary hooks and components from 'react' and 'react-router-dom'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreateRecipe.module.css";

// Define the CreateRecipe functional component
// Define state variables for the form fields and ingredients list
const CreateRecipe = () => {
  // State for recipe name
  const [name, setName] = useState("");
  // State for recipe description
  const [description, setDescription] = useState("");
  // State for ingredient name
  const [ingredientName, setIngredientName] = useState("");
  // State for ingredient quantity
  const [quantity, setQuantity] = useState("");
  // State for preparation method
  const [preparationMethod, setPreparationMethod] = useState("");
  // State for cooking method
  const [cookingMethod, setCookingMethod] = useState("");
  // State for list of ingredients
  const [ingredients, setIngredients] = useState([]);
  // Hook to programmatically navigate between routes
  const navigate = useNavigate();

  // Function to handle adding an ingredient to the list
  const handleAddIngredient = () => {
    // Create a new ingredient object
    const newIngredient = {
      name: ingredientName,
      weight: quantity,
      preparationType: preparationMethod,
      cookingMethod: cookingMethod,
    };

    // Update the ingredients list with the new ingredient
    setIngredients([...ingredients, newIngredient]);
    // Reset the ingredient form fields
    setIngredientName("");
    setQuantity("");
    setPreparationMethod("");
    setCookingMethod("");
  };

  // Function to handle adding a new recipe
  const handleAddRecipe = async () => {
    // Create a new recipe object
    const newRecipe = {
      name,
      description,
      ingredients,
    };

    try {
      // Send a POST request to the server to add the new recipe
      const response = await fetch("http://localhost:3000/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecipe), // Send the new recipe data as JSON
      });

      // Check if the request was successful
      if (response.ok) {
        alert("Recipe added successfully"); // Show success message
        navigate("/view-recipes"); // Navigate to the view recipes page
      } else {
        console.error("Failed to add recipe, status code:", response.status); // Log error if request failed
      }
    } catch (error) {
      console.error("Error adding recipe:", error); // Log any error that occurs during the request
    }
  };

  // Return the JSX for rendering the CreateRecipe component
  return (
    <div className="container">
      <h1>Create Recipe</h1>
      <div className={styles.formGroup}>
        <label className={styles.label}>
          Recipe Name:
          <input
            className={styles.input}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} // Update name state on input change
          />
        </label>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>
          Recipe Description:
          <textarea
            className={styles.textarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)} // Update description state on textarea change
          />
        </label>
      </div>
      <div className={styles.ingredientSection}>
        <h2>Add Ingredients</h2>
        <div className={styles.ingredientForm}>
          <label className={styles.label}>
            Ingredient Name:
            <input
              className={styles.input}
              type="text"
              value={ingredientName}
              onChange={(e) => setIngredientName(e.target.value)} // Update ingredientName state on input change
            />
          </label>
          <label className={styles.label}>
            Quantity:
            <input
              className={styles.input}
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)} // Update quantity state on input change
            />
          </label>
          <label className={styles.label}>
            Preparation Method:
            <input
              className={styles.input}
              type="text"
              value={preparationMethod}
              onChange={(e) => setPreparationMethod(e.target.value)} // Update preparationMethod state on input change
            />
          </label>
          <label className={styles.label}>
            Cooking Method:
            <input
              className={styles.input}
              type="text"
              value={cookingMethod}
              onChange={(e) => setCookingMethod(e.target.value)} // Update cookingMethod state on input change
            />
          </label>
          <button className={styles.button} onClick={handleAddIngredient}>
            Add Ingredient
          </button>{" "}
          {/* Call handleAddIngredient on button click */}
        </div>
      </div>
      <div className={styles.ingredientList}>
        <h2>Ingredients List</h2>
        <ul>
          {/* Map over the ingredients array to display each ingredient */}
          {ingredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient.name} - {ingredient.weight} -{" "}
              {ingredient.preparationType} - {ingredient.cookingMethod}
            </li>
          ))}
        </ul>
      </div>
      <button className={styles.button} onClick={handleAddRecipe}>
        Add Recipe
      </button>{" "}
      {/* Call handleAddRecipe on button click */}
    </div>
  );
};

export default CreateRecipe; // Export the CreateRecipe component as the default export
