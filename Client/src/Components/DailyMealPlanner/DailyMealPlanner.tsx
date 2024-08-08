import { useEffect, useState, type ChangeEvent } from "react";
import type { DailyMealPlan, Recipe, SelectedMeals } from "../../types";

export const DailyMealPlanner = ({ userId }: { userId: number }) => {
	let initDate: Date | number = new Date();
	initDate.setHours(1);
	initDate.setMinutes(0);
	initDate.setSeconds(0);
	initDate.setMilliseconds(0);
	initDate = initDate.getTime();

	// State to manage the current date
	const [currentDate, setCurrentDate] = useState<Date>(new Date(initDate));

	// State to manage the list of recipes
	const [recipes, setRecipes] = useState<Recipe[]>([]);

	const [mealPlanId, setMealPlanId] = useState<number | null>();

	// State to manage selected meals for breakfast, lunch, and dinner
	const [selectedMeals, setSelectedMeals] = useState<SelectedMeals>({
		breakfast: null,
		lunch: null,
		dinner: null,
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
			const response = await fetch("http://localhost:3000/recipes", {
				credentials: "include",
			});
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
				`http://localhost:3000/mealplans/${date.getTime()}`,
				{
					credentials: "include",
				},
			);
			if (response.ok) {
				const data = await response.json();
				if (data) {
					setSelectedMeals({
						breakfast: data.breakfast || null,
						lunch: data.lunch || null,
						dinner: data.dinner || null,
					});
					setMealPlanId(data.id);
				} else {
					setMealPlanId(null);
					setSelectedMeals({
						breakfast: null,
						lunch: null,
						dinner: null,
					});
				}
			}
		} catch (error) {
			console.error("Error fetching meal plan:", error);
			setSelectedMeals({
				breakfast: null,
				lunch: null,
				dinner: null,
			});
		}
	};

	// Function to handle selecting a recipe for a meal
	const handleSelectRecipe = (recipe: Recipe) => {
		if (currentMealType) {
			setSelectedMeals((prevSelectedMeals) => {
				const isAlreadySelected =
					prevSelectedMeals[currentMealType as keyof typeof prevSelectedMeals]
						?.id === recipe.id;
				return {
					...prevSelectedMeals,
					[currentMealType]: isAlreadySelected ? null : recipe,
				};
			});
		}
		setCurrentMealType(null);
	};

	// Function to handle clicking the add button for a meal
	const handleAddButtonClick = (mealType: string) => {
		setCurrentMealType(mealType);
	};

	// Function to handle saving the meal plan to the server
	const handleSaveMealPlan = async () => {
		const mealPlan: DailyMealPlan = {
			date: currentDate.getTime(),
			breakfastId: selectedMeals.breakfast ? selectedMeals.breakfast.id : null,
			lunchId: selectedMeals.lunch ? selectedMeals.lunch.id : null,
			dinnerId: selectedMeals.dinner ? selectedMeals.dinner.id : null,
		};
		try {
			let method;
			let body;
			if (mealPlanId) {
				method = "PUT";
				body = {
					breakfastId: mealPlan.breakfastId,
					lunchId: mealPlan.lunchId,
					dinnerId: mealPlan.dinnerId,
				};
			} else {
				method = "POST";
				body = mealPlan;
			}
			const url = mealPlanId
				? `http://localhost:3000/mealplans/${mealPlanId}`
				: "http://localhost:3000/mealplans";
			const response = await fetch(url, {
				method: method,
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
				credentials: "include",
			});

			if (response.ok) {
				alert("Meal plan saved successfully");
			} else {
				console.error(
					"Failed to save meal plan, status code:",
					response.status,
				);
			}
		} catch (error) {
			console.error("Error saving meal plan:", error);
		}
	};

	// Function to handle changing the current date
	const handleDayChange = (direction: string) => {
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
		recipe.name.toLowerCase().includes(searchQuery.toLowerCase()),
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
		<div className="p-4">
			<div className="flex flex-wrap rounded-lg bg-white">
				<div className="w-full p-4">
					<div className="mb-4 flex items-center justify-between">
						<button
							type="button"
							className="rounded-l bg-gray-200 px-4 py-2 font-bold text-gray-800 hover:bg-gray-400"
							onClick={() => handleDayChange("prev")}
						>
							{"<"}
						</button>
						<h2 className="text-3xl font-bold">{formatDate(currentDate)}</h2>
						<button
							type="button"
							className="rounded-r bg-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-400"
							onClick={() => handleDayChange("next")}
						>
							{">"}
						</button>
					</div>
					<div className="flex flex-col flex-wrap gap-4">
						<div className="flex flex-col flex-wrap items-center rounded-lg border p-4 text-center">
							<h3 className="mb-2 text-lg font-bold">Breakfast</h3>
							<button
								type="button"
								className="mb-2 w-3/5 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
								onClick={() => handleAddButtonClick("breakfast")}
							>
								Add
							</button>
							<p>
								{selectedMeals.breakfast
									? selectedMeals.breakfast.name
									: "No Selection"}
							</p>
						</div>
						<div className="flex flex-col flex-wrap items-center rounded-lg border p-4 text-center">
							<h3 className="mb-2 text-lg font-bold">Lunch</h3>
							<button
								type="button"
								className="mb-2 w-3/5 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
								onClick={() => handleAddButtonClick("lunch")}
							>
								Add
							</button>
							<p>
								{selectedMeals.lunch
									? selectedMeals.lunch.name
									: "No Selection"}
							</p>
						</div>
						<div className="flex flex-col flex-wrap items-center rounded-lg border p-4 text-center">
							<h3 className="mb-2 text-lg font-bold">Dinner</h3>
							<button
								type="button"
								className="mb-2 w-3/5 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
								onClick={() => handleAddButtonClick("dinner")}
							>
								Add
							</button>
							<p>
								{selectedMeals.dinner
									? selectedMeals.dinner.name
									: "No Selection"}
							</p>
						</div>
					</div>
					<div className="mt-4 flex flex-wrap justify-center">
						<button
							type="button"
							className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
							onClick={handleSaveMealPlan}
						>
							Save Meal Plan
						</button>
					</div>
				</div>
			</div>

			<div className="w-full pt-10">
				<h2 className="mb-2 text-xl font-bold">Recipes</h2>
				<div className="">
					<input
						className="mb-4 w-full appearance-none rounded border border-gray-400 px-3 py-2 leading-tight text-gray-700 focus:outline-none"
						type="text"
						placeholder="Search recipes..."
						value={searchQuery}
						onChange={handleSearchChange}
					/>
					<ul className="">
						{filteredRecipes.map((recipe) => (
							<li
								key={recipe.id}
								onClick={() => handleSelectRecipe(recipe)}
								className={`pb mb-2 cursor-pointer rounded px-4 py-2 hover:bg-gray-100 ${
									(selectedMeals.breakfast &&
										recipe.id === selectedMeals.breakfast.id) ||
									(selectedMeals.lunch &&
										recipe.id === selectedMeals.lunch?.id) ||
									(selectedMeals.dinner &&
										recipe.id === selectedMeals.dinner?.id)
										? "bg-green-200"
										: ""
								}`}
							>
								{recipe.name}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};
