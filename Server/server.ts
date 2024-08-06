import express from "express";
import type { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { userRouter } from "./routes/userRoutes";
import { recipeRouter } from "./routes/recipeRoutes";
import { mealPlanRouter } from "./routes/mealPlanRoutes";

export const app = express();
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
app.use(bodyParser.json());
app.use(cors());

// ROUTES
app.get("/", (req: Request, res: Response) => {
	res.status(200).send("Neverita API is running");
});
app.use("/users", userRouter);
app.use("/user/:userId/recipes", recipeRouter);
app.use("/user/:userId/mealplans", mealPlanRouter);

// START SERVER
app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});
