import supertest from "supertest";
import { app } from "../server";
import { execSync } from "node:child_process";

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

describe("test /users endpoint", () => {
	test("should return a user", async () => {
		const mockUser = {
			id: 1,
			name: "TestUser1",
			email: "testuser1@example.com",
		};
		const response = await request.get("/users");
		expect(response.body).toEqual(mockUser);
	});
	test("should return a 200 status code", async () => {
		const response = await request.get("/users");
		expect(response.statusCode).toBe(200);
	});
});

describe("test /", () => {
	beforeEach(() => {
		execSync("bun db-test");
	});
	test("");
});
