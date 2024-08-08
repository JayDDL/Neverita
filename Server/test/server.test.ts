import supertest from "supertest";
import { app } from "../server";
import { mockUser } from "./mock";
import { PrismaClient } from "@prisma/client";
import { seedDb } from "../prisma/seed";
const prisma = new PrismaClient();

const request = supertest(app);

describe("test: if api is working", () => {
	test("should return a 200 status code", async () => {
		const response = await request.get("/");
		expect(response.statusCode).toBe(200);
	});
	test("should return neverita api working", async () => {
		const response = await request.get("/");
		expect(response.text).toBe("Neverita API is running");
	});
});

describe("test user endpoint", () => {
	test("should return a user", async () => {
    const response = await request.get("/users");
    expect(response.body).toEqual(mockUser);
  });

  test("should return a 200 status code", async () => {
    const response = await request.get("/users");
    expect(response.statusCode).toBe(200);
  });
})

describe("test user model", () => {
  beforeEach(async () => {
    await prisma.$transaction([
      prisma.recipe.deleteMany({}),
      prisma.ingredient.deleteMany({}),
      prisma.user.deleteMany({}),
    ]);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test("should find a user by email, this is to test the seeding", async () => {
    await seedDb();
    const user = await prisma.user.findUnique({
      where: {
        email: "haroon@neverita.com",
      },
    });
    expect(user?.name).toBe("Haroon");
  });

  describe("User", () => {
    test("should create a new user", async () => {
      const user = await prisma.user.create({
        data: {
          name: "Test User",
          email: "test@example.com",
          hashedPassword: "abc123",
        },
      });
      expect(user.name).toBe("Test User");
      expect(user.email).toBe("test@example.com");
    });
  });
});


