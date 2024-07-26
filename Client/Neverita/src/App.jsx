import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ViewRecipes from './Pages/ViewRecipes';
import RecipeDetails from './Pages/RecipeDetails';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/view-recipes">View Recipes</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/view-recipes" element={<ViewRecipes />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;