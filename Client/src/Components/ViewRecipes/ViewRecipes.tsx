import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RecipeList } from "../RecipeList/RecipeList";

export const ViewRecipes = ({ userId }: { userId: number }) => {
	const [recipes, setRecipes] = useState([]);
	const navigate = useNavigate();
	console.log(userId);

	// useEffect hook to fetch recipes when the component mounts
	useEffect(() => {
		const fetchRecipes = async () => {
			try {
				const response = await fetch("http://localhost:3000/recipes", {
					credentials: "include",
				});
				if (response.ok) {
					const data = await response.json();
					setRecipes(data);
				} else {
					console.error(
						"Failed to fetch recipes, status code:",
						response.status,
					);
				}
			} catch (error) {
				console.error("Error fetching recipes:", error);
			}
		};

		fetchRecipes();
	}, []);

	const handleViewClick = (id: number) => {
		navigate(`/recipe/${id}`);
	};

	return (
		<div className="w-full p-8">
			<h1 className="text-4xl font-extrabold text-black py-5">Recipes</h1>
			<RecipeList recipes={recipes} onViewClick={handleViewClick} />{" "}
		</div>
	);
};
