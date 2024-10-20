const express = require('express');
const router = express.Router();
const path = require('path');

//Serve my homepage
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

// This serves my login page
router.get('login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

// serves the registration page
router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/register.html'));
});

module.exports = router;