import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { RecipeList } from "./RecipeList";
import '@testing-library/jest-dom';
import { mockRecipes } from "../../mocks/mock";

describe("Recipe List Component", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const mockOnViewClick = vi.fn();

  it("Prop drilling is working", () => {
    render(<RecipeList recipes={mockRecipes} onViewClick={mockOnViewClick} />);

    mockRecipes.forEach((recipe) => {
      expect(screen.getByText(recipe.name)).toBeInTheDocument();
      expect(screen.getByText(recipe.description)).toBeInTheDocument();
    });

    const viewButtons = screen.getAllByText('View'); // ! might cause issues
    expect(viewButtons).toHaveLength(mockRecipes.length);
  });
});