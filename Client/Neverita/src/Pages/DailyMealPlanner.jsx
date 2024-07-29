// Import necessary hooks from 'react'
import { useState, useEffect } from 'react';
import './DailyMealPlanner.css';

// Define the DailyMealPlanner functional component
const DailyMealPlanner = () => {
  // Define state variables for the component
  const [currentDate, setCurrentDate] = useState(new Date()); // State for the current date
  const [recipes, setRecipes] = useState([]); // State for the list of recipes
  const [selectedMeals, setSelectedMeals] = useState({
    breakfast: '',
    lunch: '',
    dinner: '',
  }); // State for the selected meals
  const [currentMealType, setCurrentMealType] = useState(null); // State for the currently selected meal type
  const [searchQuery, setSearchQuery] = useState(''); // State for the search query

  // useEffect hook to fetch recipes when the component mounts
  useEffect(() => {
    fetchRecipes();
  }, []);

  // useEffect hook to fetch the meal plan whenever the current date changes
  useEffect(() => {
    fetchMealPlan(currentDate);
  }, [currentDate]);

  // Function to fetch recipes from the server
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

  // Function to fetch the meal plan for a specific date
  const fetchMealPlan = async (date) => {
    try {
      const response = await fetch(`http://localhost:5000/daily-meal-plans?date=${date.toISOString().split('T')[0]}`);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setSelectedMeals({
            breakfast: data.breakfast || '',
            lunch: data.lunch || '',
            dinner: data.dinner || '',
          });
        } else {
          setSelectedMeals({
            breakfast: '',
            lunch: '',
            dinner: '',
          });
        }
      } else {
        console.error('Failed to fetch meal plan, status code:', response.status);
        setSelectedMeals({
          breakfast: '',
          lunch: '',
          dinner: '',
        });
      }
    } catch (error) {
      console.error('Error fetching meal plan:', error);
      setSelectedMeals({
        breakfast: '',
        lunch: '',
        dinner: '',
      });
    }
  };

  // Function to handle selecting a recipe for a meal
  const handleSelectRecipe = (recipe) => {
    setSelectedMeals(prevSelectedMeals => ({
      ...prevSelectedMeals,
      [currentMealType]: recipe,
    }));
    setCurrentMealType(null);
  };

  // Function to handle the Add button click for a meal type
  const handleAddButtonClick = (mealType) => {
    setCurrentMealType(mealType);
  };

  // Function to save the meal plan to the server
  const handleSaveMealPlan = async () => {
    const mealPlan = {
      date: currentDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
      breakfastId: selectedMeals.breakfast.id,
      lunchId: selectedMeals.lunch.id,
      dinnerId: selectedMeals.dinner.id,
    };

    try {
      const response = await fetch('http://localhost:5000/daily-meal-plans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mealPlan), // Send the meal plan data as JSON
      });

      if (response.ok) {
        alert('Meal plan saved successfully'); // Show success message
      } else {
        console.error('Failed to save meal plan, status code:', response.status); // Log error if request failed
      }
    } catch (error) {
      console.error('Error saving meal plan:', error); // Log any error that occurs during the request
    }
  };

  // Function to handle changing the current day
  const handleDayChange = (direction) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + (direction === 'prev' ? -1 : 1));
      return newDate;
    });
  };

  // Function to handle changes in the search input
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter the list of recipes based on the search query
  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to format the date for display
  const formatDate = (date) => {
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${dayOfWeek} ${day}/${month}/${year}`;
  };

  // Return the JSX for rendering the DailyMealPlanner component
  return (
    <div className="daily-meal-planner">
      <div className="daily-meal-planner-content">
        <div className="meal-planner-content">
          <div className="day-navigation">
            <button onClick={() => handleDayChange('prev')}>{'<'}</button>
            <h2>{formatDate(currentDate)}</h2>
            <button onClick={() => handleDayChange('next')}>{'>'}</button>
          </div>
          <div className="meals">
            <div className="meal">
              <h3>Breakfast</h3>
              <button onClick={() => handleAddButtonClick('breakfast')}>Add</button>
              <p>{selectedMeals.breakfast ? selectedMeals.breakfast.name : 'No selection'}</p>
            </div>
            <div className="meal">
              <h3>Lunch</h3>
              <button onClick={() => handleAddButtonClick('lunch')}>Add</button>
              <p>{selectedMeals.lunch ? selectedMeals.lunch.name : 'No selection'}</p>
            </div>
            <div className="meal">
              <h3>Dinner</h3>
              <button onClick={() => handleAddButtonClick('dinner')}>Add</button>
              <p>{selectedMeals.dinner ? selectedMeals.dinner.name : 'No selection'}</p>
            </div>
          </div>
          <div className="save-button-container">
            <button className="save-button" onClick={handleSaveMealPlan}>Save Meal Plan</button>
          </div>
        </div>
        <div className="recipe-list-container">
          <div className="recipe-list">
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <ul>
              {/* Map over the filtered recipes to display each recipe */}
              {filteredRecipes.map((recipe, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectRecipe(recipe)}
                  className={
                    recipe.id === selectedMeals.breakfast?.id ||
                    recipe.id === selectedMeals.lunch?.id ||
                    recipe.id === selectedMeals.dinner?.id
                      ? 'selected'
                      : ''
                  }
                >
                  {recipe.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyMealPlanner; // Export the DailyMealPlanner component as the default export
