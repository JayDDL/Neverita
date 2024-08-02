import express, {
	type NextFunction,
	type Request,
	type Response,
} from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { db } from "./models/index";

import { userRouter } from "./Routes/userRoutes";
import { recipeRouter } from "./Routes/recipeRoutes";
import { mealPlanRouter } from "./Routes/mealPlanRoutes";
import { dailyMealPlanRouter } from "./Routes/dailyMealPlanRoutes";
import { weeklyMealPlanRouter } from "./Routes/weeklyMealPlannerRoutes";

const app = express(); // Create an instance of the Express application
const PORT = process.env.PORT || 3000; // Set the port number

const currentTime = new Date()
	.toLocaleTimeString("en-GB", {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false,
		timeZoneName: "short",
	})
	.replace(/ GMT.*/, "");

// Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
	console.log(`${currentTime}: ${req.originalUrl}`);
	next();
});
app.use(bodyParser.json()); // Use body-parser middleware to parse JSON requests
app.use(cors()); // Use CORS middleware to enable Cross-Origin Resource Sharing

// Routes
app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.use("/users", userRouter); // Use user routes for /users endpoint
app.use("/recipes", recipeRouter); // Use recipe routes for /recipes endpoint
app.use("/mealplans", mealPlanRouter); // Use meal plan routes for /mealplans endpoint
app.use("/daily-meal-plans", dailyMealPlanRouter); // Use daily meal plan routes for /daily-meal-plans endpoint
app.use("/weekly-meal-plans", weeklyMealPlanRouter); // Use weekly meal plan routes for /weekly-meal-plans endpoint

// Sync database and start server
db.sequelize.sync().then(() => {
	app.listen(PORT, () => {
		console.log(`\nServer is running on http://localhost:${PORT}`);
	});
});
