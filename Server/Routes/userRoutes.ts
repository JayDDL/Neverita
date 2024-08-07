import express from "express";
import {
	getUserController,
	userLoginController,
	userRegisterController,
} from "../controllers/userController";

export const userRouter = express.Router();

userRouter.get("/", getUserController);

userRouter.post("/login", userLoginController);

userRouter.post("/register", userRegisterController);
