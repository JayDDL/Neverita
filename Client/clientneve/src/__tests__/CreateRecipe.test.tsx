import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import CreateRecipe from "../Pages/CreateRecipe";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("CreateRecipe", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    global.alert = vi.fn(); // Mock the alert function
  });

  it("renders CreateRecipe component", () => {
    render(
      <BrowserRouter>
        <CreateRecipe />
      </BrowserRouter>
    );

    expect(screen.getByText(/Create Recipe/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Recipe Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Recipe Description/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Ingredients/i)).toBeInTheDocument();
    expect(screen.getByText(/Ingredients List/i)).toBeInTheDocument();
  });

  it("handles form inputs and adds ingredients", () => {
    render(
      <BrowserRouter>
        <CreateRecipe />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Recipe Name/i), {
      target: { value: "Test Recipe" },
    });
    fireEvent.change(screen.getByLabelText(/Recipe Description/i), {
      target: { value: "Test Description" },
    });
    fireEvent.change(screen.getByLabelText(/Ingredient Name/i), {
      target: { value: "Test Ingredient" },
    });
    fireEvent.change(screen.getByLabelText(/Quantity/i), {
      target: { value: "1 cup" },
    });
    fireEvent.change(screen.getByLabelText(/Preparation Method/i), {
      target: { value: "Chopped" },
    });
    fireEvent.change(screen.getByLabelText(/Cooking Method/i), {
      target: { value: "Boiled" },
    });

    // Use getAllByText and ensure the button is clicked
    fireEvent.click(
      screen
        .getAllByText(/Add Ingredient/i)
        .filter((el) => el.tagName === "BUTTON")[0]
    );

    expect(
      screen.getByText(/Test Ingredient - 1 cup - Chopped - Boiled/i)
    ).toBeInTheDocument();
  });

  it("submits the recipe", async () => {
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      } as Response)
    );
    global.fetch = mockFetch;

    render(
      <BrowserRouter>
        <CreateRecipe />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Recipe Name/i), {
      target: { value: "Test Recipe" },
    });
    fireEvent.change(screen.getByLabelText(/Recipe Description/i), {
      target: { value: "Test Description" },
    });

    fireEvent.click(screen.getByText(/Add Recipe/i));

    await waitFor(() =>
      expect(mockFetch).toHaveBeenCalledWith(
        "http://localhost:3000/recipes",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "Test Recipe",
            description: "Test Description",
            ingredients: [],
          }),
        })
      )
    );

    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith("/view-recipes")
    );
  });
});
