// Client\clientneve\src\__tests__\__mocks__\mockFetch.ts

import { vi } from "vitest";

const mockFetch = vi.fn((url) => {
  if (url.includes("/recipes/1")) {
    return Promise.resolve({
      ok: true,
      status: 200,
      json: () =>
        Promise.resolve({
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
        }),
    } as Response);
  }

  return Promise.resolve({
    ok: false,
    status: 404,
    json: () => Promise.resolve({}),
  } as Response);
});

global.fetch = mockFetch;

export default mockFetch;
