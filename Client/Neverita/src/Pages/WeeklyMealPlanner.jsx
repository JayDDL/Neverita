// Import necessary hooks from 'react'
import { useState, useEffect } from 'react';
import './WeeklyMealPlanner.css';

// Define the WeeklyMealPlanner functional component
const WeeklyMealPlanner = () => {
  const [currentWeek, setCurrentWeek] = useState(getCurrentWeek()); // State for the current week
  const [recipes, setRecipes] = useState([]); // State for the list of recipes
  const [mealPlans, setMealPlans] = useState(initializeMealPlans()); // State for the meal plans of the week
  const [currentMealType, setCurrentMealType] = useState(null); // State for the currently selected meal type
  const [currentDay, setCurrentDay] = useState(null); // State for the currently selected day
  const [searchQuery, setSearchQuery] = useState(''); // State for the search query

  // useEffect hook to fetch recipes when the component mounts
  useEffect(() => {
    fetchRecipes();
  }, []);

  // useEffect hook to fetch the meal plan whenever the current week changes
  useEffect(() => {
    fetchMealPlan(currentWeek.startDate);
  }, [currentWeek]);

  // Function to fetch recipes from the server
  const fetchRecipes = async () => {
    try {
      const response = await fetch('http://localhost:5000/recipes');
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

  // Function to fetch the meal plan for a specific week start date
  const fetchMealPlan = async (weekStartDate) => {
    try {
      const response = await fetch(`http://localhost:5000/weekly-meal-plans?weekStartDate=${weekStartDate}`);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setMealPlans(data.mealPlans); // Set the fetched meal plans data to the state
        } else {
          setMealPlans(initializeMealPlans()); // Initialize meal plans if no data is fetched
        }
      } else {
        console.error('Failed to fetch meal plan, status code:', response.status);
        setMealPlans(initializeMealPlans());
      }
    } catch (error) {
      console.error('Error fetching meal plan:', error);
      setMealPlans(initializeMealPlans());
    }
  };

  // Function to handle selecting a recipe for a meal
  const handleSelectRecipe = (recipe) => {
    setMealPlans(prevMealPlans => {
      const updatedMealPlans = [...prevMealPlans];
      updatedMealPlans[currentDay][currentMealType] = recipe;
      return updatedMealPlans;
    });
    setCurrentMealType(null);
    setCurrentDay(null);
  };

  // Function to handle the Add button click for a specific day and meal type
  const handleAddButtonClick = (day, mealType) => {
    setCurrentMealType(mealType);
    setCurrentDay(day);
  };

  // Function to save the meal plan to the server
  const handleSaveMealPlan = async () => {
    const mealPlan = {
      weekStartDate: currentWeek.startDate,
      mealPlans,
    };

    try {
      const response = await fetch('http://localhost:5000/weekly-meal-plans', {
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

  // Function to handle changing the current week
  const handleWeekChange = (direction) => {
    setCurrentWeek(prevWeek => {
      const newStartDate = new Date(prevWeek.startDate);
      newStartDate.setDate(newStartDate.getDate() + (direction === 'prev' ? -7 : 7));
      return getWeekFromStartDate(newStartDate);
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

  // Function to format the week range for display
  const formatWeekRange = (startDate) => {
    const start = new Date(startDate);
    const end = new Date(startDate);
    end.setDate(start.getDate() + 6);
    return `Week from ${formatDate(start)} to ${formatDate(end)}`;
  };

  // Return the JSX for rendering the WeeklyMealPlanner component
  return (
    <div className="weekly-meal-planner">
      <div className="meal-planner-content">
        <div className="week-range">
          <h2>{formatWeekRange(currentWeek.startDate)}</h2>
        </div>
        <div className="week-navigation">
          <button onClick={() => handleWeekChange('prev')}>{'<'}</button>
          <button onClick={() => handleWeekChange('next')}>{'>'}</button>
        </div>
        <div className="meal-table-and-recipes">
          <table className="meal-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Breakfast</th>
                <th>Lunch</th>
                <th>Dinner</th>
              </tr>
            </thead>
            <tbody>
              {currentWeek.days.map((day, index) => (
                <tr key={index}>
                  <td>{formatDate(day)}</td>
                  <td>
                    <div>
                      <button onClick={() => handleAddButtonClick(index, 'breakfast')}>Add</button>
                      <p>{mealPlans[index].breakfast ? mealPlans[index].breakfast.name : 'No selection'}</p>
                    </div>
                  </td>
                  <td>
                    <div>
                      <button onClick={() => handleAddButtonClick(index, 'lunch')}>Add</button>
                      <p>{mealPlans[index].lunch ? mealPlans[index].lunch.name : 'No selection'}</p>
                    </div>
                  </td>
                  <td>
                    <div>
                      <button onClick={() => handleAddButtonClick(index, 'dinner')}>Add</button>
                      <p>{mealPlans[index].dinner ? mealPlans[index].dinner.name : 'No selection'}</p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="recipe-list-container">
            <div className="recipe-list">
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <ul>
                {filteredRecipes.map((recipe, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelectRecipe(recipe)}
                    className={
                      recipe.id === mealPlans[currentDay]?.breakfast?.id ||
                      recipe.id === mealPlans[currentDay]?.lunch?.id ||
                      recipe.id === mealPlans[currentDay]?.dinner?.id
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
        <div className="save-button-container">
          <button className="save-button" onClick={handleSaveMealPlan}>Save Meal Plan</button>
        </div>
      </div>
    </div>
  );
};

// Function to get the current week starting from the current date
const getCurrentWeek = () => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // Sunday - Saturday : 0 - 6
  const numDay = now.getDate();
  const startDate = new Date(now); // copy
  startDate.setDate(numDay - dayOfWeek + 1); // set to previous Monday
  const days = Array.from({ length: 7 }, (v, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    return date;
  });
  return { startDate: startDate.toISOString().split('T')[0], days };
};

// Function to get the week starting from a specific start date
const getWeekFromStartDate = (startDate) => {
  const days = Array.from({ length: 7 }, (v, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    return date;
  });
  return { startDate: startDate.toISOString().split('T')[0], days };
};

// Function to initialize the meal plans with empty values
const initializeMealPlans = () => {
  return Array.from({ length: 7 }, () => ({
    breakfast: '',
    lunch: '',
    dinner: '',
  }));
};

export default WeeklyMealPlanner; // Export the WeeklyMealPlanner component as the default export
