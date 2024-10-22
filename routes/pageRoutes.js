const express = require('express');
const router = express.Router();
const path = require('path');

// Redirect root URL to login page
router.get('/', (req, res) => {
  res.redirect('/login');
});

// Serve manage offers/requests page
router.get('/manage', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/manage.html'));
});

// Serve login page
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/login.html'));
});

// Serve registration page
router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/register.html'));
});

module.exports = router;
