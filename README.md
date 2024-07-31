# Description

Neverita Meal Planner is a web application designed to simplify your meal planning process. Create, view, and manage daily and weekly meal plans, and generate a shopping list for all your planned recipes. The intuitive interface ensures you spend less time planning and more time enjoying your meals.

# Table of Contents
Installation
Usage
Features
Configuration
Authors
FAQ

# Installation
Follow these steps to get the development environment set up:

git clone https://github.com/JayDDL/Neverita
cd Project-Neverita
npm install (Installs general dependencies)
cd Server (Back-end folder)
npm install (Installs back-end dependencies)
cd ..\Client\Neverita (Front-End folder)
npm install (Installs front-end dependencies)

# Usage
To launch the application, you will need to have two CLI's open: One for executing the front-end and one for executing the back-end (You can use Bash alongside the built-in CLI in Visual Studio Code, for example)

From the 'Server' folder, execute 'npm run dev' to launch the server. You should see the following message in your CLI:
🚀🚀🚀🚀🚀 Server is running on http://localhost:5000 🚀🚀🚀🚀🚀

From the '\Client\Neverita' folder, execute 'npm run dev' to launch the front-end. You should see the following message in your CLI:   
VITE v5.3.4  ready
  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help

# Configuration
Inside the Server folder, update config/config.json file with your database configuration.

# Authors:
Jesús Díaz - JayDDL
https://github.com/JayDDL

# FAQ
Q: How do I create a Recipe?
  1: Navigate to the 'Create Recipe' page.
  2: Enter a Recipe name and description.
  3: Add your ingredient details, clicking 'Save ingredient' for each ingredient until all ingredients have been added.
  4: Once done, click on 'Save Recipe'. You should see a 'Recipe created' alert in your browser.

Q: How do I view created Recipes and their details?
  1: Navigate to the 'View Recipes' page.
  2: Find the Recipe from the list of Recipes.
  3: Click on the 'View' button to open a separate page with the details for the recipe.

Q: How do I view/create a Daily Meal Plan?
  1: Navigate to the 'Daily Meal Planner' page.
  2: Select an empty day that you want to view/create a Daily Meal Plan for.
  3: Click on the 'Add' button for the specific meal (Breakfast, Lunch or Dinner), then click on one of the recipes from the list of recipes on the right side of the screen.
  4: Repeat for each meal of the day.
  5: Once all meals have been added, click on the 'Save Meal Plan' button. You should see a 'Meal Plan Saved' alert in your browser. 

Q: How do I view/create a Weekly Meal Plan?
  1: Navigate to the 'Weekly Meal Planner' page.
  2: Select the week you want to view/create a Weekly Meal Plan for (Choose a week without any meal plans in them)
  3: Click on the 'Add' button for the specific meal (Breakfast, Lunch or Dinner) for any day, then click on one of the recipes from the list of recipes on the right side of the screen.
  4: Repeat for every meal/day of the week. 
  5: Once all meals have been added for every day of that week, click on the 'Save Meal Plan' button. You should see a 'Meal Plan Saved' alert in your browser. Keep in mind that, at this stage, you will be unable to save a weekly meal plan if meal plans are already present for some or all days in that week.