const express = require('express');
const { getUser, createUser } = require('../Controllers/userController');

const userRouter = express.Router();

// Basic GET request
userRouter.get('/user', async (req, res) => {
  try {
    await getUser(req, res);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Basic POST request
userRouter.post('/user', async (req, res) => {
  try {
    await createUser(req, res);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = userRouter;