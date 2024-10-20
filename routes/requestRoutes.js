const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const { ensureAuthenticated } = require('../middleware/authMiddleware');

// @route   POST /requests
// @desc    Create a new help request
// @access  Private (Authenticated users only)
router.post('/', ensureAuthenticated, requestController.createRequest);

// @route   GET /requests
// @desc    Get all help requests
// @access  Public
router.get('/', requestController.getRequests);

// @route   GET /requests/:id
// @desc    Get a specific help request by ID
// @access  Public
router.get('/:id', requestController.getRequestById);

// @route   PUT /requests/:id
// @desc    Update a help request
// @access  Private (Only request creator)
router.put('/:id', ensureAuthenticated, requestController.updateRequest);

// @route   DELETE /requests/:id
// @desc    Delete a help request
// @access  Private (Only request creator)
router.delete('/:id', ensureAuthenticated, requestController.deleteRequest);

module.exports = router;