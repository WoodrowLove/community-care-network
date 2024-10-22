# Community Care Network

## Overview
The **Community Care Network** is a full-stack web application that enables users to create, manage, and fulfill community help requests and offers. This platform allows users to sign up, log in, create offers or requests, manage their active and completed requests, and connect with others in their community.

## Features
- **User Authentication**: Register and log in securely using Passport.js and bcrypt.
- **Create Requests & Offers**: Users can create and publish community help requests and offers.
- **Manage Requests & Offers**: Users can update and delete their requests and offers, and mark them as completed.
- **Dynamic User Interface**: Requests and offers are dynamically displayed on the manage screen with CRUD operations.
- **Session Management**: Uses express-session for managing user sessions.

## Tech Stack
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ORM
- **Authentication**: Passport.js (Local Strategy)
- **Styling**: Custom CSS for UI consistency and user experience

## Project Structure

community-care-network/
│
├── config/
│   ├── db.js               # Database connection file
│   ├── passport.js         # Passport authentication configuration
│
├── controllers/
│   ├── authController.js   # Handles authentication operations
│   ├── requestController.js # Handles CRUD operations for requests
│   ├── offerController.js   # Handles CRUD operations for offers
│
├── middleware/
│   ├── authMiddleware.js   # Middleware for authentication checks
│
├── models/
│   ├── userModel.js        # User model for MongoDB
│   ├── requestModel.js     # Request model for MongoDB
│   ├── offerModel.js       # Offer model for MongoDB
│
├── public/
│   ├── css/
│   │   ├── styles-login.css     # CSS for login page
│   │   ├── styles-request.css   # CSS for request form page
│   │   ├── styles-manage.css    # CSS for manage screen
│   │
│   ├── js/
│       ├── manage.js            # JavaScript for dynamic manage screen
│       ├── requestForm.js       # JavaScript for handling request form
│
├── routes/
│   ├── authRoutes.js        # Routes for authentication
│   ├── requestRoutes.js     # Routes for requests CRUD operations
│   ├── offerRoutes.js       # Routes for offers CRUD operations
│   ├── pageRoutes.js        # Routes for serving HTML pages
│
├── views/
│   ├── login.html           # Login page
│   ├── requestForm.html     # Request creation form page
│   ├── manage.html          # Manage requests and offers page
│   ├── index.html           # Home page
│
├── .env                     # Environment variables file
├── app.js                   # Main server file
├── package.json             # Dependencies and scripts
└── README.md                # App overview and documentation

## Installation & Setup

### Prerequisites
- Node.js and npm installed
- MongoDB database (hosted on MongoDB Atlas or locally)

### Installation Steps
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd community-care-network

	2.	Install Dependencies:

npm install


	3.	Set Up Environment Variables:
Create a .env file in the root directory and add the following variables:

MONGO_URI=<Your MongoDB URI>
SESSION_SECRET=<Your Secret Key>


	4.	Start the Server:

npm start


	5.	Access the App:
Open your browser and go to http://localhost:5000.

Features & User Stories

Authentication

	•	User Registration: As a new user, I can register an account using my name, email, and password.
	•	User Login: As a registered user, I can log in using my email and password.

Requests & Offers

	•	Create Requests: As an authenticated user, I can create a help request with details such as title, description, location, category, and timeframe.
	•	Manage Requests & Offers: As an authenticated user, I can view, update, and delete my own requests and offers.
	•	Mark as Complete: As an authenticated user, I can mark my requests or offers as complete once they are fulfilled.

CRUD Functionality Overview

The app includes full CRUD functionality for users, requests, and offers:

	•	Create:
	•	User Registration
	•	Create new help requests or offers
	•	Read:
	•	Display all active requests and offers
	•	Fetch and display user-specific requests and offers dynamically
	•	Update:
	•	Mark requests or offers as complete
	•	Update user profile (if implemented)
	•	Delete:
	•	Delete user account
	•	Delete user requests and offers

Routes Overview

	•	Authentication Routes (/auth/):
	•	POST /auth/register - Register a new user
	•	POST /auth/login - Log in a user
	•	GET /auth/logout - Log out a user
	•	DELETE /auth/delete - Delete a user account
	•	Request Routes (/requests/):
	•	POST / - Create a new request
	•	GET /user - Get all requests created by the user
	•	PUT /:id/complete - Mark a request as complete
	•	DELETE /:id - Delete a request
	•	Offer Routes (/offers/):
	•	Similar structure to requests for creating, reading, updating, and deleting offers.

Future Enhancements

	•	User Profiles: Implement user profile pages to allow users to update their information.
	•	Request Search: Add search and filter functionality to allow users to find specific requests.
	•	Notifications: Notify users when their offers or requests are fulfilled.

Challenges & Learnings

The main challenges faced during the development of this app were:

	•	Dynamic UI Updates: Ensuring the user interface updates dynamically without requiring a full page refresh after creating, updating, or deleting a request.
	•	Authentication Integration: Implementing secure authentication using Passport.js and session management.
	•	Managing State: Properly managing state across multiple user interactions and maintaining CRUD consistency.