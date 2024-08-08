import request from 'supertest';
import app from './server'; 

  let server;

  beforeAll((done) => {
    server = app.listen(4000, (err) => {
      if (err) return done(err);
      done();
    });
  });
  afterAll((done) => {
    server.close(done);
  });
  describe('API Routes', () => {
    // Daily Meal Plan Routes
    describe('Daily Meal Plan Routes', () => {
      it('GET /daily-meal-plans should return all daily meal plans', async () => {
      const res = await request(app).get('/daily-meal-plans');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('GET /daily-meal-plans/:date should return a meal plan for the specified date', async () => {
      const date = '2024-01-01';  
      const res = await request(app).get(`/daily-meal-plans/${date}`);
      if (res.statusCode === 200) {
        expect(res.body).toHaveProperty('date', date);
      } else {
        expect(res.statusCode).toBe(404);
      }
    });

    it('POST /daily-meal-plans should create a new daily meal plan', async () => {
      const newMealPlan = {
        date: '2024-02-01',
        breakfastId: 1, 
        lunchId: 2,     
        dinnerId: 3     
      };
      const res = await request(app).post('/daily-meal-plans').send(newMealPlan);
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('date', newMealPlan.date);
    });
  });

  // Meal Plan Routes
  describe('Meal Plan Routes', () => {
    it('GET mealplans should return all meal plans', async () => {
      const res = await request(app).get('/mealplans');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('POST mealplans should create a new meal plan', async () => {
      const newMealPlan = {
        name: 'Sample Meal Plan',
        description: 'This is a sample meal plan'
      };
      const res = await request(app).post('/mealplans').send(newMealPlan);
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('name', newMealPlan.name);
    });
  });

  // Recipe Routes
  describe('Recipe Routes', () => {
    it('GET recipes should return all recipes', async () => {
      const res = await request(app).get('/recipes');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('GET /recipes/:id should return a recipe by ID', async () => {
      const id = 1;  
      const res = await request(app).get(`/recipes/${id}`);
      if (res.statusCode === 200) {
        expect(res.body).toHaveProperty('id', id);
      } else {
        expect(res.statusCode).toBe(404);
      }
    });

    it('POST recipes should create a new recipe', async () => {
      const newRecipe = {
        name: 'Sample Recipe',
        description: 'This is a sample recipe',
        ingredients: [{ ingredient: 'Sample Ingredient', quantity: '1 cup' }]
      };
      const res = await request(app).post('/recipes').send(newRecipe);
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('title', newRecipe.name);
    });
  });

  // Weekly Meal Plan Routes
  describe('Weekly Meal Plan Routes', () => {
    it('GET weekly-meal-plans should return a weekly meal plan for the specified start date', async () => {
      const startDate = '2024-01-01'; 
      const res = await request(app).get(`/weekly-meal-plans?startDate=${startDate}`);
      if (res.statusCode === 200) {
        expect(res.body).toHaveProperty('weekStartDate', startDate);
      } else {
        expect(res.statusCode).toBe(404);
      }
    });

    it('POST weekly-meal-plans should create a new weekly meal plan', async () => {
      const newWeeklyMealPlan = {
        weekStartDate: '2024-02-01',
        weekEndDate: '2024-02-07',
        monday: { breakfast: 'Eggs', lunch: 'Salad', dinner: 'Chicken' },
        tuesday: { breakfast: 'Pancakes', lunch: 'Sandwich', dinner: 'Fish' },
        wednesday: { breakfast: 'Cereal', lunch: 'Soup', dinner: 'Steak' },
        thursday: { breakfast: 'Toast', lunch: 'Pizza', dinner: 'Pasta' },
        friday: { breakfast: 'Bagel', lunch: 'Burger', dinner: 'Sushi' },
        saturday: { breakfast: 'Waffles', lunch: 'Tacos', dinner: 'BBQ' },
        sunday: { breakfast: 'Omelette', lunch: 'Pasta', dinner: 'Roast' }
      };
      const res = await request(app).post('/weekly-meal-plans').send(newWeeklyMealPlan);
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('weekStartDate', newWeeklyMealPlan.weekStartDate);
    });
  });

});
