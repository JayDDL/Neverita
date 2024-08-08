import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import RecipeList from "../Components/RecipeList";

const mockRecipes = [
  {
    id: 1,
    name: "Greek Yogurt Parfait",
    description:
      "A nutritious parfait with Greek yogurt, fresh berries, and granola.",
    ingredients: [
      {
        name: "Greek yogurt",
        weight: "1 cup",
        cookingMethod: "None",
        preparationType: "Measured",
      },
      {
        name: "Honey",
        weight: "1 tbsp",
        cookingMethod: "None",
        preparationType: "Measured",
      },
    ],
  },
  {
    id: 2,
    name: "Avocado Toast",
    description:
      "A simple and delicious avocado toast with a sprinkle of salt and pepper.",
    ingredients: [
      {
        name: "Avocado",
        weight: "1",
        cookingMethod: "Mashed",
        preparationType: "Mashed",
      },
      {
        name: "Toast",
        weight: "2 slices",
        cookingMethod: "Toasted",
        preparationType: "Toasted",
      },
    ],
  },
];

describe("RecipeList", () => {
  it("renders RecipeList component with recipes", () => {
    const onViewClick = vi.fn();
    render(<RecipeList recipes={mockRecipes} onViewClick={onViewClick} />);

    // Check that the recipe titles are rendered
    const recipeTitles = screen.getAllByRole("heading", { level: 2 });
    expect(recipeTitles[0]).toHaveTextContent("Greek Yogurt Parfait");
    expect(recipeTitles[1]).toHaveTextContent("Avocado Toast");

    // Check that the recipe descriptions are rendered
    const recipeDescriptions = screen.getAllByRole("paragraph");
    expect(recipeDescriptions[0]).toHaveTextContent(
      "A nutritious parfait with Greek yogurt, fresh berries, and granola."
    );
    expect(recipeDescriptions[1]).toHaveTextContent(
      "A simple and delicious avocado toast with a sprinkle of salt and pepper."
    );
  });

  it("calls onViewClick with the correct id when view button is clicked", () => {
    const onViewClick = vi.fn();
    render(<RecipeList recipes={mockRecipes} onViewClick={onViewClick} />);

    // Click the view button for the first recipe
    fireEvent.click(screen.getAllByText(/View/i)[0]);
    expect(onViewClick).toHaveBeenCalledWith(1);

    // Click the view button for the second recipe
    fireEvent.click(screen.getAllByText(/View/i)[1]);
    expect(onViewClick).toHaveBeenCalledWith(2);
  });
});
