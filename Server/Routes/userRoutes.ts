import express from "express";
import {
	getUserController,
	createUserController,
} from "../Controllers/userController";

export const userRouter = express.Router(); // Create a new router object for users

// Basic GET request
userRouter.get("/", getUserController);

// Basic POST request
userRouter.post("/", createUserController);
