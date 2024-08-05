import { useState, useEffect, useCallback, ChangeEvent } from "react";
import "./WeeklyMealPlanner.css";
import { DailyMealPlan, Recipe, SelectedMeals } from "../../types";

export  const WeeklyMealPlanner = () => {
  const [currentWeek, setCurrentWeek] = useState(getCurrentWeek());
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [mealPlans, setMealPlans] = useState<SelectedMeals[]>(
    initializeMealPlans()
  );
  const [currentMealType, setCurrentMealType] = useState<string | null>(null);
  const [currentDay, setCurrentDay] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Function to fetch recipes from the server
  const fetchRecipes = useCallback(async () => {
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
  }, []);

  // Function to fetch the meal plan for a specific date from the server
  const fetchMealPlanByDate = async (date: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/daily-meal-plans/${date}`
      );
      if (response.ok) {
        const data = await response.json();
        return {
          breakfast: data.breakfast || "",
          lunch: data.lunch || "",
          dinner: data.dinner || "",
        };
      } else {
        console.error(
          "Failed to fetch meal plan, status code:",
          response.status
        );
        return { breakfast: "", lunch: "", dinner: "" };
      }
    } catch (error) {
      console.error("Error fetching meal plan:", error);
      return { breakfast: "", lunch: "", dinner: "" };
    }
  };

  // Function to fetch weekly meal plans from the server
  const fetchWeeklyMealPlans = useCallback(async (weekStartDate: string) => {
    const promises = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStartDate);
      date.setDate(date.getDate() + i);
      const formattedDate = date.toISOString().split("T")[0];
      promises.push(fetchMealPlanByDate(formattedDate));
    }
    const results = await Promise.all(promises);
    setMealPlans(results);
  }, []);

  useEffect(() => {
    fetchRecipes();
    fetchWeeklyMealPlans(currentWeek.startDate);
  }, [currentWeek, fetchRecipes, fetchWeeklyMealPlans]);

  // Function to handle selecting a recipe for a meal
  const handleSelectRecipe = (recipe: Recipe) => {
    setMealPlans((prevMealPlans) => {
      const updatedMealPlans = [...prevMealPlans];
      console.log(updatedMealPlans);
      console.log(currentDay, currentMealType);
      if (
        typeof currentDay === "number" &&
        typeof currentMealType === "string"
      ) {
        updatedMealPlans[currentDay][
          currentMealType as keyof (typeof updatedMealPlans)[number]
        ] = recipe;
      }
      return updatedMealPlans;
    });
    setCurrentMealType(null);
    setCurrentDay(null);
  };

  // Function to handle clicking the add button for a meal
  const handleAddButtonClick = (day: number, mealType: string) => {
    setCurrentMealType(mealType);
    setCurrentDay(day);
  };

  // Function to handle saving the meal plan to the server
  const handleSaveMealPlan = async () => {
    const promises = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentWeek.startDate);
      date.setDate(date.getDate() + i);
      const formattedDate = date.toISOString().split("T")[0];
      const mealPlan: DailyMealPlan = {
        date: formattedDate,
        breakfastId:
          typeof mealPlans[i].breakfast === "string"
            ? (mealPlans[i].breakfast as string)
            : (mealPlans[i].breakfast as Recipe).id,
        lunchId:
          typeof mealPlans[i].lunch === "string"
            ? (mealPlans[i].lunch as string)
            : (mealPlans[i].lunch as Recipe).id,

        dinnerId:
          typeof mealPlans[i].dinner === "string"
            ? (mealPlans[i].dinner as string)
            : (mealPlans[i].dinner as Recipe).id,
      };
      promises.push(saveMealPlan(mealPlan));
    }
    await Promise.all(promises);
    alert("Meal plan saved successfully");
  };

  // Function to save the meal plan to the server
  const saveMealPlan = async (mealPlan: DailyMealPlan) => {
    console.log(mealPlan);
    try {
      const response = await fetch("http://localhost:5000/daily-meal-plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mealPlan),
      });

      if (!response.ok) {
        console.error(
          "Failed to save meal plan, status code:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error saving meal plan:", error);
    }
  };

  // Function to handle changing the current week
  const handleWeekChange = (direction: string) => {
    setCurrentWeek((prevWeek) => {
      const newStartDate = new Date(prevWeek.startDate);
      newStartDate.setDate(
        newStartDate.getDate() + (direction === "prev" ? -7 : 7)
      );
      return getWeekFromStartDate(newStartDate);
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

  // Function to format the week range as a string
  const formatWeekRange = (startDate: string) => {
    const start = new Date(startDate);
    const end = new Date(startDate);
    end.setDate(start.getDate() + 6);
    return `Week from ${formatDate(start)} to ${formatDate(end)}`;
  };
  

  return (
    <div className="weekly-meal-planner">
      <div className="meal-planner-content">
        <div className="week-range">
          <h2>{formatWeekRange(currentWeek.startDate)}</h2>
        </div>
        <div className="week-navigation">
          <button onClick={() => handleWeekChange("prev")}>{"<"}</button>
          <button onClick={() => handleWeekChange("next")}>{">"}</button>
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
                      <button
                        onClick={() => handleAddButtonClick(index, "breakfast")}
                      >
                        Add
                      </button>
                      <p>
                        {mealPlans[index].breakfast &&
                        typeof mealPlans[index].breakfast !== "string"
                          ? mealPlans[index].breakfast.name
                          : "No selection"}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div>
                      <button
                        onClick={() => handleAddButtonClick(index, "lunch")}
                      >
                        Add
                      </button>
                      <p>
                        {mealPlans[index].lunch &&
                        typeof mealPlans[index].lunch !== "string"
                          ? mealPlans[index].lunch.name
                          : "No selection"}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div>
                      <button
                        onClick={() => handleAddButtonClick(index, "dinner")}
                      >
                        Add
                      </button>
                      <p>
                        {mealPlans[index].dinner &&
                        typeof mealPlans[index].dinner !== "string"
                          ? mealPlans[index].dinner.name
                          : "No selection"}
                      </p>
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
                      recipe.id === currentDay &&
                      (typeof mealPlans[currentDay].breakfast !== "string"
                        ? mealPlans[currentDay].breakfast.id
                        : null) ||
                          recipe.id === currentDay &&
                          (typeof mealPlans[currentDay].lunch !== "string"
                            ? mealPlans[currentDay].lunch.id
                            : null) ||
                          recipe.id === currentDay &&
                          (typeof mealPlans[currentDay].dinner !== "string"
                            ? mealPlans[currentDay].dinner.id
                            : null) 
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
        <div className="save-button-container">
          <button className="save-button" onClick={handleSaveMealPlan}>
            Save Meal Plan
          </button>
        </div>
      </div>
    </div>
  );
};

// Function to get the current week, starting from Monday
const getCurrentWeek = () => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // Sunday - Saturday : 0 - 6
  const numDay = now.getDate();
  const startDate = new Date(now); // copy
  startDate.setDate(numDay - dayOfWeek + 1); // set to previous Monday
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    return date;
  });
  return { startDate: startDate.toISOString().split("T")[0], days };
};

// Function to get the week from a start date
const getWeekFromStartDate = (startDate : Date) => {
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    return date;
  });
  return { startDate: startDate.toISOString().split("T")[0], days };
};

// Function to initialize meal plans for the week
const initializeMealPlans = () => {
  return Array.from({ length: 7 }, () => ({
    breakfast: "",
    lunch: "",
    dinner: "",
  }));
};

