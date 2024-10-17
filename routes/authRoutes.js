const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// @route   POST /auth/register
// @desc    Register a new user
router.post('/register', authController.registerUser);

// @route   POST /auth/login
// @desc    Log in a user
router.post('/login', authController.loginUser);

// @route   GET /auth/logout
// @desc    Log out a user
router.get('/logout', authController.logoutUser);

module.exports = router;