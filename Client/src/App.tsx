import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ViewRecipes } from "./Components/ViewRecipes/ViewRecipes";
import { RecipeDetails } from "./Components/RecipeDetails/RecipeDetails";
import { CreateRecipe } from "./Components/CreateRecipe/CreateRecipe";
import { DailyMealPlanner } from "./Components/DailyMealPlanner/DailyMealPlanner";
import { useState } from "react";
import { Login } from "./Components/Login/Login";
import { Navbar } from "./Components/NavBar/NavBar";
import Profile from "./Components/Profile/Profile";

const App = () => {
	const [userId, setUserId] = useState<null | number>(null);

	const loggedIn = userId && (
		<Router>
			<div className="flex flex-wrap-reverse justify-center h-screen ">
				<footer className="w-full h-16">
					<Navbar />
				</footer>
				<div className="w-full p-3">
					<Routes>
						<Route
							path="/view-recipes"
							element={<ViewRecipes userId={userId} />}
						/>
						<Route
							path="/recipe/:recipeId"
							element={<RecipeDetails userId={userId} />}
						/>
						<Route
							path="/create-recipe"
							element={<CreateRecipe userId={userId} />}
						/>
						<Route
							path="/daily-meal-planner"
							element={<DailyMealPlanner userId={userId} />}
						/>
						<Route path="/profile" element={<Profile />} />
					</Routes>
				</div>
			</div>
		</Router>
	);

	const loggedOut = (
		<>
			<Router>
				<Login setUserId={setUserId} />
			</Router>
		</>
	);

	return <>{userId ? loggedIn : loggedOut}</>;
};

export default App;
