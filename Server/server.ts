import express from "express";
import type { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { userRouter } from "./Routes/userRoutes";
import { recipeRouter } from "./Routes/recipeRoutes";
import { mealPlanRouter } from "./Routes/mealPlanRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

const currentTime = new Date()
	.toLocaleTimeString("en-GB", {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false,
		timeZoneName: "short",
	})
	.replace(/ GMT.*/, "");

// MIDDLEWARE
app.use((req: Request, res: Response, next: NextFunction) => {
	console.log(`${currentTime}: ${req.originalUrl}`);
	next();
});
app.use(bodyParser.json()); // Use body-parser middleware to parse JSON requests
app.use(cors()); // Use CORS middleware to enable Cross-Origin Resource Sharing

// ROUTES
app.get("/", (req: Request, res: Response) => {
	res.status(200).send("Neverita API is running");
});

app.use("/users", userRouter); // Use user routes for /users endpoint
app.use("/user/:userId/recipes", recipeRouter); // Use recipe routes for /recipes endpoint
app.use("/user/:userId/mealplans", mealPlanRouter); // Use daily meal plan routes for /daily-meal-plans endpoint

// Sync database and start server
app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});
