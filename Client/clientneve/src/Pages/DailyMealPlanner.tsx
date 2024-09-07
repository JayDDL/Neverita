import React, { useEffect, useState } from "react";
import "./DailyMealPlanner.css";
import { Recipe, MealType, Meal } from "../Types/type";

type SelectedMeals = {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
};

const DailyMealPlanner: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedMeals, setSelectedMeals] = useState<SelectedMeals>({
    breakfast: { id: "", name: "" },
    lunch: { id: "", name: "" },
    dinner: { id: "", name: "" },
  });
  const [currentMealType, setCurrentMealType] = useState<MealType | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    fetchMealPlan(currentDate);
  }, [currentDate]);

  const fetchRecipes = async () => {
    try {
      const response = await fetch("http://localhost:3000/recipes");
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

  const fetchMealPlan = async (date: Date) => {
    try {
      const response = await fetch(
        `http://localhost:3000/daily-meal-plans/${
          date.toISOString().split("T")[0]
        }`
      );
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setSelectedMeals({
            breakfast: data.breakfast || { id: "", name: "" },
            lunch: data.lunch || { id: "", name: "" },
            dinner: data.dinner || { id: "", name: "" },
          });
        } else {
          setSelectedMeals({
            breakfast: { id: "", name: "" },
            lunch: { id: "", name: "" },
            dinner: { id: "", name: "" },
          });
        }
      } else {
        console.error(
          "Failed to fetch meal plan, status code:",
          response.status
        );
        setSelectedMeals({
          breakfast: { id: "", name: "" },
          lunch: { id: "", name: "" },
          dinner: { id: "", name: "" },
        });
      }
    } catch (error) {
      console.error("Error fetching meal plan:", error);
      setSelectedMeals({
        breakfast: { id: "", name: "" },
        lunch: { id: "", name: "" },
        dinner: { id: "", name: "" },
      });
    }
  };

  const handleSelectRecipe = (recipe: Recipe) => {
    if (currentMealType) {
      setSelectedMeals((prevSelectedMeals) => ({
        ...prevSelectedMeals,
        [currentMealType]: { id: recipe.id.toString(), name: recipe.title },
      }));
      setCurrentMealType(null);
    }
  };

  const handleAddButtonClick = (mealType: MealType) => {
    setCurrentMealType(mealType);
  };

  const handleSaveMealPlan = async () => {
    const mealPlan = {
      date: currentDate.toISOString().split("T")[0],
      breakfastId: selectedMeals.breakfast.id,
      lunchId: selectedMeals.lunch.id,
      dinnerId: selectedMeals.dinner.id,
    };

    try {
      const response = await fetch("http://localhost:3000/daily-meal-plans", {
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

  const handleDayChange = (direction: string) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + (direction === "prev" ? -1 : 1));
      return newDate;
    });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (date: Date): string => {
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
                {selectedMeals.breakfast.name
                  ? selectedMeals.breakfast.name
                  : "No selection"}
              </p>
            </div>
            <div className="meal">
              <h3>Lunch</h3>
              <button onClick={() => handleAddButtonClick("lunch")}>Add</button>
              <p>
                {selectedMeals.lunch.name
                  ? selectedMeals.lunch.name
                  : "No selection"}
              </p>
            </div>
            <div className="meal">
              <h3>Dinner</h3>
              <button onClick={() => handleAddButtonClick("dinner")}>
                Add
              </button>
              <p>
                {selectedMeals.dinner.name
                  ? selectedMeals.dinner.name
                  : "No selection"}
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
              {filteredRecipes.map((recipe) => (
                <li
                  key={recipe.id}
                  onClick={() => handleSelectRecipe(recipe)}
                  className={
                    recipe.id.toString() === selectedMeals.breakfast.id ||
                    recipe.id.toString() === selectedMeals.lunch.id ||
                    recipe.id.toString() === selectedMeals.dinner.id
                      ? "selected"
                      : ""
                  }
                >
                  {recipe.title}
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
