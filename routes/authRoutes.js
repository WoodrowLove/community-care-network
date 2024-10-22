const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');
const authController = require('../controllers/authController');

// @route   GET /login
// @desc    Render login page
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/login.html'));
});

// @route   POST /login
// @desc    Handle login from submission using passport
router.post('/login', authController.loginUser);

// @route   POST /auth/register
// @desc    Register a new user
router.post('auth/register', authController.registerUser);

// @route   GET /auth/logout
// @desc    Log out a user
router.get('auth/logout', authController.logoutUser);

module.exports = router;

