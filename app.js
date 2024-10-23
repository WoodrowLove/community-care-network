require('dotenv').config();  // Load environment variables from .env

const express = require('express');
const connectDB = require('./config/db'); // MongoDB connection function
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo'); // Store session data in MongoDB
const path = require('path');
const flash = require('connect-flash'); // Flash messages for success/failure notifications

// Import routes
const authRoutes = require('./routes/authRoutes');
const requestRoutes = require('./routes/requestRoutes');
const offerRoutes = require('./routes/offerRoutes');
const pageRoutes = require('./routes/pageRoutes');  // For frontend pages like home, login, register

// Initialize Express
const app = express();

// Serve static files (like CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse my form data
app.use(express.urlencoded({ extended: true}));

// Connect to MongoDB
connectDB();  // Connect to MongoDB via the db.js file

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Express session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
  }), // Store sessions in MongoDB
  
}));

// Passport middleware (for authentication)
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);  // Passport config

// Flash messages middleware
app.use(flash());

// Set global variables for flash messages
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Redirect root URL to login if not authenticated
app.get('/', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Routes
app.use('/', pageRoutes);         // Serve frontend pages
app.use('/', authRoutes);     // Authentication routes
app.use('/requests', requestRoutes); // Help request routes
app.use('/offers', offerRoutes);  // Offer routes

// route forhelp request creation page
app.get('/create-request', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'requestForm.html'));
});

// Fallback route for unknown endpoints
app.use((req, res, next) => {
  res.status(404).send({ message: 'Resource not found' });
});

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
