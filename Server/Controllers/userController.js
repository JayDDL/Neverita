const { User } = require('../models'); // For when we add real User functionality, not used at the moment due to us using mock user instead
const mockUser = { id: 1, name: 'TestUser1', email: 'testuser1@example.com' }; // Mock user for testing purposes

const getUser = async (req, res) => {
  try {
    res.status(200).json(mockUser);  // Returns the mock user
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    // Assuming the mock user is created
    res.status(201).json(mockUser); // Returns the mock user
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getUser, createUser };