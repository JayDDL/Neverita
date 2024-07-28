import { useState, useEffect } from 'react';
import './DailyMealPlanner.css';

const DailyMealPlanner = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [recipes, setRecipes] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState({
    breakfast: '',
    lunch: '',
    dinner: '',
  });
  const [currentMealType, setCurrentMealType] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    fetchMealPlan(currentDate);
  }, [currentDate]);

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

  const handleSelectRecipe = (recipe) => {
    setSelectedMeals(prevSelectedMeals => ({
      ...prevSelectedMeals,
      [currentMealType]: recipe,
    }));
    setCurrentMealType(null);
  };

  const handleAddButtonClick = (mealType) => {
    setCurrentMealType(mealType);
  };

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
        body: JSON.stringify(mealPlan),
      });

      if (response.ok) {
        alert('Meal plan saved successfully');
      } else {
        console.error('Failed to save meal plan, status code:', response.status);
      }
    } catch (error) {
      console.error('Error saving meal plan:', error);
    }
  };

  const handleDayChange = (direction) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + (direction === 'prev' ? -1 : 1));
      return newDate;
    });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (date) => {
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${dayOfWeek} ${day}/${month}/${year}`;
  };

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

export default DailyMealPlanner;