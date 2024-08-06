import "@testing-library/jest-dom";
import { beforeEach, describe, expect, vi, it } from "vitest";
import { MemoryRouter} from "react-router-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { mockResponse} from "../../mocks/mock";
import { CreateRecipe } from "./CreateRecipe";

describe("Create Recipe Component", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("Renders static components properly", () => {
    render(
      <MemoryRouter>
        <CreateRecipe userId={1} />
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
        <CreateRecipe userId={1} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Ingredient Name:'), { target: { value: 'Tomato' } });
    fireEvent.change(screen.getByLabelText('Quantity:'), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText('Preparation Method:'), { target: { value: 'Chopped' } });
    fireEvent.change(screen.getByLabelText('Cooking Method:'), { target: { value: 'Boiled' } });

    fireEvent.click(screen.getByText('Add Ingredient'));

    expect(screen.getByText('Tomato - 2 - Chopped - Boiled')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Recipe Name:'), { target: { value: 'Tomato Soup' } });
    fireEvent.change(screen.getByLabelText('Recipe Description:'), { target: { value: 'A delicious tomato soup.' } });

    vi.spyOn(window, 'fetch').mockResolvedValue(
      mockResponse(200, 'OK', {} as Promise<null>)
    );

    fireEvent.click(screen.getByText('Add Recipe'));

    const mockAlert = vi.spyOn(window, 'alert').mockImplementation(() => {});
    
    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith('Recipe added successfully');
    });
  });
});
