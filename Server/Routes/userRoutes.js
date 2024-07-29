const express = require('express'); // Import the Express module
const { getUser, createUser } = require('../Controllers/userController'); // Import the controller functions for users

const userRouter = express.Router(); // Create a new router object for users

// Basic GET request
userRouter.get('/', async (req, res) => { // Define a route to get a user
  try {
    await getUser(req, res); // Call the getUser function
  } catch (error) {
    res.status(500).send(error); // Send a 500 error response if an error occurs
  }
});

// Basic POST request
userRouter.post('/', async (req, res) => { // Define a route to create a new user
  try {
    await createUser(req, res); // Call the createUser function
  } catch (error) {
    res.status(500).send(error); // Send a 500 error response if an error occurs
  }
});

module.exports = userRouter; // Export the userRouter
