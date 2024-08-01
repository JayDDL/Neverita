import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ViewRecipes from './Pages/ViewRecipes';
import RecipeDetails from './Pages/RecipeDetails';
import CreateRecipe from './Pages/CreateRecipe';
import DailyMealPlanner from './Pages/DailyMealPlanner';
import WeeklyMealPlanner from './Pages/WeeklyMealPlanner';
import './App.css'

const App = () => {
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
          <Route path="/view-recipes" element={<ViewRecipes />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/daily-meal-planner" element={<DailyMealPlanner />} />
          <Route path="/weekly-meal-planner" element={<WeeklyMealPlanner />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;