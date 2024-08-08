// Import necessary hooks and components from 'react' and 'react-router-dom'
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Recipe, Ingredients } from "../Types/type";
import styles from "./CreateRecipe.module.css";

// Define the CreateRecipe functional component
// Define state variables for the form fields and ingredients list
const CreateRecipe = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredientName, setIngredientName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [preparationMethod, setPreparationMethod] = useState("");
  const [cookingMethod, setCookingMethod] = useState("");
  const [ingredients, setIngredients] = useState<Ingredients[]>([]);
  const navigate = useNavigate();

  // Function to handle adding an ingredient to the list
  const handleAddIngredient = () => {
    const newIngredient: Ingredients = {
      name: ingredientName,
      weight: quantity,
      preparationType: preparationMethod,
      cookingMethod: cookingMethod,
    };

    // Update the ingredients list with the new ingredient
    setIngredients([...ingredients, newIngredient]);
    setIngredientName("");
    setQuantity("");
    setPreparationMethod("");
    setCookingMethod("");
  };

  // Function to handle adding a new recipe
  const handleAddRecipe = async () => {
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
        body: JSON.stringify(newRecipe),
      });

      if (response.ok) {
        alert("Recipe added successfully");
        navigate("/view-recipes");
      } else {
        console.error("Failed to add recipe, status code:", response.status);
      }
    } catch (error) {
      console.error("Error adding recipe:", error);
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
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>
          Recipe Description:
          <textarea
            className={styles.textarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
              onChange={(e) => setIngredientName(e.target.value)}
            />
          </label>
          <label className={styles.label}>
            Quantity:
            <input
              className={styles.input}
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </label>
          <label className={styles.label}>
            Preparation Method:
            <input
              className={styles.input}
              type="text"
              value={preparationMethod}
              onChange={(e) => setPreparationMethod(e.target.value)}
            />
          </label>
          <label className={styles.label}>
            Cooking Method:
            <input
              className={styles.input}
              type="text"
              value={cookingMethod}
              onChange={(e) => setCookingMethod(e.target.value)}
            />
          </label>
          <button className={styles.button} onClick={handleAddIngredient}>
            Add Ingredient
          </button>{" "}
        </div>
      </div>
      <div className={styles.ingredientList}>
        <h2>Ingredients List</h2>
        <ul>
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
    </div>
  );
};

export default CreateRecipe;
