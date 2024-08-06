import { useState, useEffect, useCallback, ChangeEvent, useRef } from "react";
import { DailyMealPlan, Recipe, SelectedMeals } from "../../types";

export const WeeklyMealPlanner = ({ userId }: { userId: number }) => {
  const [currentWeek, setCurrentWeek] = useState(getCurrentWeek());
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [mealPlans, setMealPlans] = useState<SelectedMeals[]>(
    initializeMealPlans()
  );
  const [currentMealType, setCurrentMealType] = useState<string | null>(null);
  const [currentDay, setCurrentDay] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const mealPlanIdRef = useRef<(number | null)[]>(Array(7).fill(null));

  const fetchRecipes = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/user/${userId}/recipes`
      );
      if (response.ok) {
        const data = await response.json();
        setRecipes(data);
      } else {
        console.error("Failed to fetch recipes, status code:", response.status);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  }, [userId]);

  const fetchMealPlanByDate = async (date: number, index: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/user/${userId}/mealplans/${date}`
      );
      if (response.ok) {
        const data = await response.json();
        mealPlanIdRef.current[index] = data.id;
        console.log(`Fetched meal plan ID for day ${index}:`, data.id);
        return {
          breakfast: data.breakfast || null,
          lunch: data.lunch || null,
          dinner: data.dinner || null,
        };
      } else {
        console.error(
          "Failed to fetch meal plan, status code:",
          response.status
        );
        return { breakfast: null, lunch: null, dinner: null };
      }
    } catch (error) {
      console.error("Error fetching meal plan:", error);
      return { breakfast: null, lunch: null, dinner: null };
    }
  };

  const fetchWeeklyMealPlans = useCallback(async (weekStartDate: string) => {
    const promises = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStartDate);
      date.setDate(date.getDate() + i);
      const dateTimestamp = date.getTime();
      promises.push(fetchMealPlanByDate(dateTimestamp, i));
    }
    const results = await Promise.all(promises);
    setMealPlans(results);
  }, []);

  useEffect(() => {
    fetchRecipes();
    fetchWeeklyMealPlans(currentWeek.startDate);
    // Reset mealPlanIdRef when week changes
    mealPlanIdRef.current = Array(7).fill(null);
  }, [currentWeek, fetchWeeklyMealPlans, fetchRecipes]);

  const handleSelectRecipe = (recipe: Recipe) => {
    setMealPlans((prevMealPlans) => {
      const updatedMealPlans = [...prevMealPlans];
      if (
        typeof currentDay === "number" &&
        typeof currentMealType === "string"
      ) {
        updatedMealPlans[currentDay][
          currentMealType as keyof (typeof updatedMealPlans)[number]
        ] = recipe;
      }
      console.log("updated:", updatedMealPlans);
      return updatedMealPlans;
    });
    setCurrentMealType(null);
    setCurrentDay(null);
  };

  const handleAddButtonClick = (day: number, mealType: string) => {
    setCurrentMealType(mealType);
    setCurrentDay(day);
  };

  const saveMealPlan = async (mealPlan: DailyMealPlan, index: number) => {
    let method, body, url;
    const currentMealPlanId = mealPlanIdRef.current[index];
    console.log(`Saving meal plan for day ${index}, current ID:`, currentMealPlanId);

    if (currentMealPlanId !== null) {
      method = "PUT";
      body = {
        breakfastId: mealPlan.breakfastId,
        lunchId: mealPlan.lunchId,
        dinnerId: mealPlan.dinnerId,
      };
      url = `http://localhost:3000/user/${userId}/mealplans/${currentMealPlanId}`;
    } else {
      method = "POST";
      body = mealPlan;
      url = `http://localhost:3000/user/${userId}/mealplans`;
    }

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        if (method === "POST") {
          mealPlanIdRef.current[index] = data.id;
          console.log(`Updated mealPlanId for day ${index}:`, data.id);
        }
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

  const handleSaveMealPlan = async () => {
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentWeek.startDate);
      date.setDate(date.getDate() + i);
      const mealPlan: DailyMealPlan = {
        date: date.getTime(),
        breakfastId: mealPlans[i].breakfast
          ? (mealPlans[i].breakfast as Recipe).id
          : null,
        lunchId: mealPlans[i].lunch ? (mealPlans[i].lunch as Recipe).id : null,
        dinnerId: mealPlans[i].dinner
          ? (mealPlans[i].dinner as Recipe).id
          : null,
      };
      await saveMealPlan(mealPlan, i);
    }
    alert("Meal plan saved successfully");
  };

  const handleWeekChange = (direction: string) => {
    setCurrentWeek((prevWeek) => {
      const newStartDate = new Date(prevWeek.startDate);
      newStartDate.setDate(
        newStartDate.getDate() + (direction === "prev" ? -7 : 7)
      );
      return getWeekFromStartDate(newStartDate);
    });
    // Reset meal plans when changing weeks
    setMealPlans(initializeMealPlans());
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (date: Date) => {
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${dayOfWeek} ${day}/${month}/${year}`;
  };

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
                      (recipe.id === currentDay &&
                        mealPlans[currentDay].breakfast) ||
                      (recipe.id === currentDay &&
                        mealPlans[currentDay].lunch) ||
                      (recipe.id === currentDay && mealPlans[currentDay].dinner)
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
          <button onClick={handleSaveMealPlan}>
            Save Meal Plan
          </button>
        </div>
      </div>
    </div>
  );
};

const getCurrentWeek = () => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const numDay = now.getDate();
  const startDate = new Date(now);
  startDate.setDate(numDay - dayOfWeek + 1);
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    date.setHours(1);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  });
  return { startDate: startDate.toISOString().split("T")[0], days };
};

const getWeekFromStartDate = (startDate: Date) => {
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    return date;
  });
  return { startDate: startDate.toISOString().split("T")[0], days };
};

const initializeMealPlans = () => {
  return Array.from({ length: 7 }, () => ({
    breakfast: null,
    lunch: null,
    dinner: null,
  }));
};