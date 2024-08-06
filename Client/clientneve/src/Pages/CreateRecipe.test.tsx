import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CreateRecipe from "./CreateRecipe";
import "@testing-library/jest-dom/extend-expect";

// Mock useNavigate from react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("CreateRecipe Component", () => {
  test("renders CreateRecipe component", () => {
    render(
      <MemoryRouter>
        <CreateRecipe />
      </MemoryRouter>
    );

    expect(screen.getByText(/Create Recipe/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Recipe Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Recipe Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Ingredient Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Quantity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Preparation Method/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Cooking Method/i)).toBeInTheDocument();
  });

  test("adds an ingredient to the list", () => {
    render(
      <MemoryRouter>
        <CreateRecipe />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Ingredient Name/i), {
      target: { value: "Sugar" },
    });
    fireEvent.change(screen.getByLabelText(/Quantity/i), {
      target: { value: "100g" },
    });
    fireEvent.change(screen.getByLabelText(/Preparation Method/i), {
      target: { value: "Chopped" },
    });
    fireEvent.change(screen.getByLabelText(/Cooking Method/i), {
      target: { value: "Boiled" },
    });

    fireEvent.click(screen.getByText(/Add Ingredient/i));

    expect(
      screen.getByText(/Sugar - 100g - Chopped - Boiled/i)
    ).toBeInTheDocument();
  });

  test("handles adding a new recipe", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    ) as jest.Mock;

    render(
      <MemoryRouter>
        <CreateRecipe />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Recipe Name/i), {
      target: { value: "Cake" },
    });
    fireEvent.change(screen.getByLabelText(/Recipe Description/i), {
      target: { value: "Delicious cake" },
    });

    fireEvent.change(screen.getByLabelText(/Ingredient Name/i), {
      target: { value: "Flour" },
    });
    fireEvent.change(screen.getByLabelText(/Quantity/i), {
      target: { value: "200g" },
    });
    fireEvent.change(screen.getByLabelText(/Preparation Method/i), {
      target: { value: "Sifted" },
    });
    fireEvent.change(screen.getByLabelText(/Cooking Method/i), {
      target: { value: "Baked" },
    });

    fireEvent.click(screen.getByText(/Add Ingredient/i));

    fireEvent.click(screen.getByText(/Add Recipe/i));

    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:5000/recipes",
        expect.objectContaining({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: "Cake",
            description: "Delicious cake",
            ingredients: [
              {
                name: "Flour",
                weight: "200g",
                preparationType: "Sifted",
                cookingMethod: "Baked",
              },
            ],
          }),
        })
      )
    );

    expect(screen.getByText(/Recipe added successfully/i)).toBeInTheDocument();
  });
});
