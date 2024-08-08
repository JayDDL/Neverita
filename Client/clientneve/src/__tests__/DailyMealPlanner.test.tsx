import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import DailyMealPlanner from "../Pages/DailyMealPlanner";

const mockFetch = vi.fn((url) => {
  if (url.endsWith("/recipes")) {
    return Promise.resolve({
      ok: true,
      status: 200,
      json: () =>
        Promise.resolve([
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
        ]),
    } as Response);
  }

  if (url.includes("/daily-meal-plans/")) {
    return Promise.resolve({
      ok: true,
      status: 200,
      json: () =>
        Promise.resolve({
          breakfast: { id: "1", name: "Greek Yogurt Parfait" },
          lunch: { id: "2", name: "Avocado Toast" },
          dinner: { id: "1", name: "Greek Yogurt Parfait" },
        }),
    } as Response);
  }

  return Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve({}),
  } as Response);
});

global.fetch = mockFetch;

describe("DailyMealPlanner", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mockFetch.mockClear();
  });

  it("renders DailyMealPlanner component", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <DailyMealPlanner />
        </BrowserRouter>
      );
    });

    await waitFor(() =>
      expect(screen.getByText(/Breakfast/i)).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(
        screen.getAllByText(/Greek Yogurt Parfait/i).length
      ).toBeGreaterThan(0)
    );
    await waitFor(() =>
      expect(screen.getAllByText(/Avocado Toast/i).length).toBeGreaterThan(0)
    );
  });

  it("handles date navigation", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <DailyMealPlanner />
        </BrowserRouter>
      );
    });

    fireEvent.click(screen.getByText(">"));
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(3)); // Initial fetch and two navigations
  });

  it("handles search and select recipe", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <DailyMealPlanner />
        </BrowserRouter>
      );
    });

    fireEvent.change(screen.getByPlaceholderText(/Search recipes/i), {
      target: { value: "Greek" },
    });

    await waitFor(() => {
      expect(
        screen.getAllByText(/Greek Yogurt Parfait/i).length
      ).toBeGreaterThan(0);
    });

    fireEvent.click(screen.getAllByText(/Greek Yogurt Parfait/i)[0]);
  });

  it("saves meal plan", async () => {
    const alertMock = vi.fn();
    global.alert = alertMock;

    await act(async () => {
      render(
        <BrowserRouter>
          <DailyMealPlanner />
        </BrowserRouter>
      );
    });

    fireEvent.click(screen.getByText(/Save Meal Plan/i));
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(3)); // One for each save operation
    await waitFor(() =>
      expect(alertMock).toHaveBeenCalledWith("Meal plan saved successfully")
    );
  });
});
