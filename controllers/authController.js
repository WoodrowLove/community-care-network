const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// User Registration
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = new User({ name, email, password });
    await newUser.save();
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// User Login
exports.loginUser = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/requests',  // Redirect to help requests on success
    failureRedirect: '/auth/login',  // Redirect to login page on failure
    failureFlash: true
  })(req, res, next);
};

// User Logout
exports.logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.redirect('/auth/login');
  });
};