import express from "express";
import { getUser, createUser } from "../Controllers/userController";

export const userRouter = express.Router(); // Create a new router object for users

// Basic GET request
userRouter.get("/", getUser);

// Basic POST request
userRouter.post("/", createUser);
