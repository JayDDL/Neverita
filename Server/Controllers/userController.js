// Import the User model from the models directory
const { User } = require('../models'); // For when we add real User functionality, not used at the moment due to us using mock user instead

// Define a mock user for testing purposes
const mockUser = { id: 1, name: 'TestUser1', email: 'testuser1@example.com' };

// Function to get the mock user
const getUser = async (req, res) => {
  try {
    // Send the mock user as a JSON response with a status code of 200
    res.status(200).json(mockUser);  // Returns the mock user
  } catch (error) {
    // Send an error message as a JSON response with a status code of 500 if an error occurs
    res.status(500).json({ error: error.message });
  }
};

// Function to create the mock user
const createUser = async (req, res) => {
  try {
    // Assuming the mock user is created
    res.status(201).json(mockUser); // Returns the mock user
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export the getUser and createUser functions
module.exports = { getUser, createUser };
