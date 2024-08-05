import { render, screen, waitFor } from "@testing-library/react";
import { vi, describe, beforeEach, expect, it } from "vitest";
import { ViewRecipes } from "./ViewRecipes";
import { MemoryRouter } from "react-router-dom";
import { mockRecipes } from "../../mocks/mock";


describe("ViewRecipes Component", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders the component title", () => {
    render(
      <MemoryRouter>
        <ViewRecipes />
      </MemoryRouter>
    );
    expect(screen.getByText("Recipes")).toBeInTheDocument();
  });

  it("renders a list of recipes", async () => {
    vi.spyOn(window, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: async () => mockRecipes
      } as Response)
    );

    render(
      <MemoryRouter>
        <ViewRecipes />
      </MemoryRouter>
    );


    await waitFor(() => {
    mockRecipes.forEach((recipe) => {
      expect(screen.getByText(recipe.name)).toBeInTheDocument()
      expect(screen.getByText(recipe.description)).toBeInTheDocument()
    })
  })})
  

});
