import type { RecipeProps } from "../../types";

// Define the RecipeList functional component, which takes recipes and onViewClick as props
export const RecipeList = ({ recipes, onViewClick }: RecipeProps) => {
	return (
		<div className="flex flex-wrap gap-4">
			{recipes.map((recipe) => (
				<div
					key={recipe.id}
					className="flex min-w-full items-center overflow-hidden rounded-lg border border-gray-400 bg-white p-4"
				>
					<div className="flex-grow">
						<div className="recipe-title mb-2 text-lg font-medium">
							{recipe.name}
						</div>
						<div className="recipe-description text-gray-600">
							{recipe.description}
						</div>
					</div>
					<button
						className="view-button ml-4 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
						onClick={() => onViewClick(recipe.id)}
					>
						View
					</button>
				</div>
			))}
		</div>
	);
};
