import { useEffect, useState, ChangeEvent } from "react";
import "./DailyMealPlanner.css";
import { DailyMealPlan, Recipe, SelectedMeals } from "../../types";

export const DailyMealPlanner = () => {
  // State to manage the current date
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  // State to manage the list of recipes
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // State to manage selected meals for breakfast, lunch, and dinner
  const [selectedMeals, setSelectedMeals] = useState<SelectedMeals>({
    breakfast: "",
    lunch: "",
    dinner: "",
  });

  // State to manage the current meal type being added (breakfast, lunch, or dinner)
  const [currentMealType, setCurrentMealType] = useState<string | null>(null);

  // State to manage the search query for filtering recipes
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch recipes when the component mounts
  useEffect(() => {
    fetchRecipes();
  }, []);

  // Fetch the meal plan whenever the current date changes
  useEffect(() => {
    fetchMealPlan(currentDate);
  }, [currentDate]);

  // Function to fetch recipes from the server
  const fetchRecipes = async () => {
    try {
      const response = await fetch("http://localhost:5000/recipes");
      if (response.ok) {
        const data = await response.json();
        setRecipes(data);
      } else {
        console.error("Failed to fetch recipes, status code:", response.status);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  // Function to fetch the meal plan for a specific date from the server
  const fetchMealPlan = async (date: Date) => {
    try {
      const response = await fetch(
        `http://localhost:5000/daily-meal-plans/${
          date.toISOString().split("T")[0]
        }`
      );
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setSelectedMeals({
            breakfast: data.breakfast || "",
            lunch: data.lunch || "",
            dinner: data.dinner || "",
          });
        }
      } else {
        setSelectedMeals({
          breakfast: "",
          lunch: "",
          dinner: "",
        });
      }
    } catch (error) {
      console.error("Error fetching meal plan:", error);
      setSelectedMeals({
        breakfast: "",
        lunch: "",
        dinner: "",
      });
    }
  };

  // Function to handle selecting a recipe for a meal
  const handleSelectRecipe = (recipe: Recipe) => {
    console.log(recipe);
    if (currentMealType) {
      setSelectedMeals((prevSelectedMeals) => ({
        ...prevSelectedMeals,
        [currentMealType]: recipe,
      }));
    }
    setCurrentMealType(null);
  };

  // Function to handle clicking the add button for a meal
  const handleAddButtonClick = (mealType: string) => {
    console.log(mealType);
    setCurrentMealType(mealType);
  };

  // Function to handle saving the meal plan to the server
  const handleSaveMealPlan = async () => {
    const mealPlan: DailyMealPlan = {
      date: currentDate.toISOString().split("T")[0], // Format as YYYY-MM-DD
      breakfastId:
        typeof selectedMeals.breakfast == "string"
          ? selectedMeals.breakfast
          : selectedMeals.breakfast.id,
      lunchId:
        typeof selectedMeals.lunch == "string"
          ? selectedMeals.lunch
          : selectedMeals.lunch.id,
      dinnerId:
        typeof selectedMeals.dinner == "string"
          ? selectedMeals.dinner
          : selectedMeals.dinner.id,
    };

    try {
      const response = await fetch("http://localhost:5000/daily-meal-plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mealPlan),
      });

      if (response.ok) {
        alert("Meal plan saved successfully");
      } else {
        console.error(
          "Failed to save meal plan, status code:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error saving meal plan:", error);
    }
  };

  // Function to handle changing the current date
  const handleDayChange = (direction: string) => {
    console.log(direction);
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + (direction === "prev" ? -1 : 1));
      return newDate;
    });
  };

  // Function to handle changes in the search input
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Filter recipes based on the search query
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to format the date as a string
  const formatDate = (date: Date) => {
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${dayOfWeek} ${day}/${month}/${year}`;
  };

  return (
    <div className="daily-meal-planner">
      <div className="daily-meal-planner-content">
        <div className="meal-planner-content">
          <div className="day-navigation">
            <button onClick={() => handleDayChange("prev")}>{"<"}</button>
            <h2>{formatDate(currentDate)}</h2>
            <button onClick={() => handleDayChange("next")}>{">"}</button>
          </div>
          <div className="meals">
            <div className="meal">
              <h3>Breakfast</h3>
              <button onClick={() => handleAddButtonClick("breakfast")}>
                Add
              </button>
              <p>
                {typeof selectedMeals.breakfast == "string"
                  ? "No selection"
                  : selectedMeals.breakfast.name}
              </p>
            </div>
            <div className="meal">
              <h3>Lunch</h3>
              <button onClick={() => handleAddButtonClick("lunch")}>Add</button>
              <p>
                {typeof selectedMeals.lunch == "string"
                  ? "No selection"
                  : selectedMeals.lunch.name}
              </p>
            </div>
            <div className="meal">
              <h3>Dinner</h3>
              <button onClick={() => handleAddButtonClick("dinner")}>
                Add
              </button>
              <p>
                {typeof selectedMeals.dinner == "string"
                  ? "No selection"
                  : selectedMeals.dinner.name}
              </p>
            </div>
          </div>
          <div className="save-button-container">
            <button className="save-button" onClick={handleSaveMealPlan}>
              Save Meal Plan
            </button>
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
                    (typeof selectedMeals.breakfast != "string" &&
                      recipe.id === selectedMeals.breakfast.id) ||
                    (typeof selectedMeals.lunch != "string" &&
                      recipe.id === selectedMeals.lunch?.id) ||
                    (typeof selectedMeals.dinner != "string" &&
                      recipe.id === selectedMeals.dinner?.id)
                      ? "selected"
                      : ""
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
