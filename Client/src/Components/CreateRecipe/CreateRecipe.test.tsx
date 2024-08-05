import "@testing-library/jest-dom";
import { beforeEach, describe, expect, vi, it } from "vitest";
import { MemoryRouter} from "react-router-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { mockRecipe, mockResponse} from "../../mocks/mock";
import { CreateRecipe } from "./CreateRecipe";

describe("Create Recipe Component", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("Renders static components properly", () => {
    render(
      <MemoryRouter>
        <CreateRecipe />
      </MemoryRouter>
    );
    expect(screen.getByText("Create Recipe")).toBeInTheDocument();
    expect(screen.getByText("Add Ingredients")).toBeInTheDocument();
    expect(screen.getByText("Recipe Name:")).toBeInTheDocument();
    expect(screen.getByText("Recipe Description:")).toBeInTheDocument();
    expect(screen.getByText("Ingredient Name:")).toBeInTheDocument();
    expect(screen.getByText("Quantity:")).toBeInTheDocument();
    expect(screen.getByText("Preparation Method:")).toBeInTheDocument();
    expect(screen.getByText("Cooking Method:")).toBeInTheDocument();
    expect(screen.getByText("Add Ingredients")).toBeInTheDocument();
    expect(screen.getByText("Ingredients List")).toBeInTheDocument();
    expect(screen.getByText("Add Recipe")).toBeInTheDocument();
  });

  it('Submitting Recipe', async () => {
    render(
      <MemoryRouter>
        <CreateRecipe />
      </MemoryRouter>
    );

    // Fill in the ingredient form fields
    fireEvent.change(screen.getByLabelText('Ingredient Name:'), { target: { value: 'Tomato' } });
    fireEvent.change(screen.getByLabelText('Quantity:'), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText('Preparation Method:'), { target: { value: 'Chopped' } });
    fireEvent.change(screen.getByLabelText('Cooking Method:'), { target: { value: 'Boiled' } });

    // Click the "Add Ingredient" button
    fireEvent.click(screen.getByText('Add Ingredient'));

    // Assert that the ingredient has been added to the list
    expect(screen.getByText('Tomato - 2 - Chopped - Boiled')).toBeInTheDocument();

    // Fill in the recipe form fields
    fireEvent.change(screen.getByLabelText('Recipe Name:'), { target: { value: 'Tomato Soup' } });
    fireEvent.change(screen.getByLabelText('Recipe Description:'), { target: { value: 'A delicious tomato soup.' } });

    // Mock the fetch function
    vi.spyOn(window, 'fetch').mockResolvedValue(
      mockResponse(200, 'OK', {})
    );

    // Click the "Add Recipe" button
    fireEvent.click(screen.getByText('Add Recipe'));

    // Assert that the fetch function was called with the correct parameters
    await waitFor(() => {
      expect(window.fetch).toHaveBeenCalledWith('http://localhost:5000/recipes', expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Tomato Soup',
          description: 'A delicious tomato soup.',
          ingredients: [
            {
              name: 'Tomato',
              weight: '2',
              preparationType: 'Chopped',
              cookingMethod: 'Boiled',
            },
          ],
        }),
      }));
    });

    // Assert that the success message is shown
    await waitFor(() => {
      expect(screen.getByText('Recipe added successfully')).toBeInTheDocument();
    });
  });
});
