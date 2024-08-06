import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { ViewRecipes } from "./Components/ViewRecipes/ViewRecipes";
import { RecipeDetails } from "./Components/RecipeDetails/RecipeDetails";
import { CreateRecipe } from "./Components/CreateRecipe/CreateRecipe";
import { DailyMealPlanner } from "./Components/DailyMealPlanner/DailyMealPlanner";
import { WeeklyMealPlanner } from "./Components/WeeklyMealPlanner/WeeklyMealPlanner";
import "./App.css";
import { useState } from "react";

const App = () => {

  const [userId, setUserId] = useState(1)

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/view-recipes">View Recipes</Link>
            </li>
            <li>
              <Link to="/create-recipe">Create Recipe</Link>
            </li>
            <li>
              <Link to="/daily-meal-planner">Daily Meal Planner</Link>
            </li>
            <li>
              <Link to="/weekly-meal-planner">Weekly Meal Planner</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/view-recipes" element={<ViewRecipes userId = {userId} />} />
          <Route path="/recipe/:recipeId" element={<RecipeDetails userId={userId}/>} />
          <Route path="/create-recipe" element={<CreateRecipe userId = {userId} />} />
          <Route path="/daily-meal-planner" element={<DailyMealPlanner userId = {userId}/>} />
          <Route path="/weekly-meal-planner" element={<WeeklyMealPlanner userId = {userId} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
