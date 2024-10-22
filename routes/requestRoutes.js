const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const { ensureAuthenticated } = require('../middleware/authMiddleware');

// Create a new request (POST)
router.post('/', ensureAuthenticated, requestController.createRequest);

// Get all requests (GET)
router.get('/', ensureAuthenticated, requestController.getRequests);

// Get requests by user (GET)
router.get('/user', ensureAuthenticated, requestController.getUserRequests);

// Delete a request (DELETE)
router.delete('/:id', ensureAuthenticated, requestController.deleteRequest);

// Mark a request as complete (PUT)
router.put('/:id/complete', ensureAuthenticated, requestController.markAsComplete);


module.exports = router;