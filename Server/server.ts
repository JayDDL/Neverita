import express from "express";
import type { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

import { userRouter } from "./routes/userRoutes";
import { recipeRouter } from "./routes/recipeRoutes";
import { mealPlanRouter } from "./routes/mealPlanRoutes";
import {
	authMiddleware,
	generateAccessToken,
	loggingMiddleware,
	validateAccessToken,
	validateRefreshToken,
} from "./utils";


declare global {
  namespace Express {
    interface Request {
      user: number; 
    }
  }
}

export const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(
	cors({
			credentials: true,
			origin: "http://localhost:5173",
			allowedHeaders: ["Content-Type", "Authorization"],
	}),
);
app.use(cookieParser());

const tests = process.argv.slice(2)

if(!tests){
// MIDDLEWARE
app.use(loggingMiddleware);
app.use(authMiddleware);
}

// ROUTES
app.use("/user", userRouter);
app.use("/recipes", recipeRouter);
app.use("/mealplans", mealPlanRouter);

// START SERVER
app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});
