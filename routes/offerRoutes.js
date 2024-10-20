const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController');
const { ensureAuthenticated } = require('../middleware/authMiddleware');

// @route   POST /offers
// @desc    Create a new offer to help with a request
// @access  Private (Authenticated users only)
router.post('/', ensureAuthenticated, offerController.createOffer);

// @route   GET /offers/request/:requestId
// @desc    Get all offers for a specific help request
// @access  Private (Authenticated users only)
router.get('/request/:requestId', ensureAuthenticated, offerController.getOffersByRequestId);

// @route   PUT /offers/:id
// @desc    Update the status of an offer (e.g., accept or mark as completed)
// @access  Private (Request owner or helper)
router.put('/:id', ensureAuthenticated, offerController.updateOfferStatus);

// @route   DELETE /offers/:id
// @desc    Delete an offer
// @access  Private (Only the offer creator)
router.delete('/:id', ensureAuthenticated, offerController.deleteOffer);

module.exports = router;