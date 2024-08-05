import type { Request, Response } from "express";
// Define a mock user for testing purposes
const mockUser = { id: 1, name: "TestUser1", email: "testuser1@example.com" };

// Function to get the mock user
export const getUserController = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		// Send the mock user as a JSON response with a status code of 200
		res.status(200).json(mockUser); // Returns the mock user
	} catch (error) {
		const typedError = error as Error;
		// Send an error message as a JSON response with a status code of 500 if an error occurs
		res.status(500).json({ error: typedError.message });
	}
};

// Function to create the mock user
export const createUserController = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		// Assuming the mock user is created
		res.status(201).json(mockUser); // Returns the mock user
	} catch (error) {
		const typedError = error as Error;
		res.status(500).json({ error: typedError.message });
	}
};
