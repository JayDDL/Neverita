

export const mockRecipes = [
  {
    id: 1,
    name: 'Test Recipe',
    description: 'A test recipe description',
    ingredients: [
      { name: 'Ingredient 1', weight: '100g', preparationType: 'Chopped', cookingMethod: 'Fried' }
    ]
  },
  {
    id: 2,
    name: 'Test Recipe 2',
    description: 'A test recipe description 2',
    ingredients: [
      { name: 'Ingredient 1', weight: '100g', preparationType: 'Chopped', cookingMethod: 'Fried' }
    ]
  }
]


export const mockRecipe = {
  id: '1',
  name: 'Test Recipe',
  description: 'A test recipe description',
  ingredients: [
    { name: 'Ingredient 1', weight: '100g', preparationType: 'Chopped', cookingMethod: 'Fried' }
  ]
};



export const mockDiet = { result: 'Vegetarian' };



export const mockResponse = (status: number, statusText: string, response: Promise<null>) => {
  return new Response(JSON.stringify(response), {
    status: status,
    statusText: statusText,
    headers: { 'Content-type': 'application/json' }
  });
};