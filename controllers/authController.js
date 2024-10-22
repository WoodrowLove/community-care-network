const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// User Registration
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash('error_msg', 'User already exists');
      return res.redirect('/auth/register');
    }
    const newUser = new User({ name, email, password });
    await newUser.save();
    console.log('User saved:', newUser); // Check user saving
    req.flash('success_msg', 'You are now registered and can log in');
    res.redirect('/auth/login');
  } catch (error) {
    console.log('Error saving user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// User Login
exports.loginUser = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.log('Authentication error:', err);
      return next(err);
    }
    if (!user) {
      console.log('Login failed:', info.message);
      req.flash('error_msg', info.message);
      return res.redirect('/auth/login');
    }
    req.logIn(user, (err) => {
      if (err) {
        console.log('Login error:', err);
        return next(err);
      }
      console.log('Login successful:', user);
      req.flash('success_msg', 'Login successful');
      return res.redirect('/');
    });
  })(req, res, next);
};

// User Logout
exports.logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    req.flash('success_msg', 'You are logged out');
    res.redirect('/auth/login');
  });
};

