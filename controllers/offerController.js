const Offer = require('../models/offerModel');
const Request = require('../models/requestModel');

// Create a new offer to help with a request
exports.createOffer = async (req, res) => {
  const { requestId } = req.body;

  try {
    // Ensure the request exists
    const request = await Request.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Check if the user has already offered help on this request
    const existingOffer = await Offer.findOne({ request: requestId, user: req.user.id });
    if (existingOffer) {
      return res.status(400).json({ message: 'You have already offered to help with this request' });
    }

    // Create new offer
    const newOffer = new Offer({
      request: requestId,
      user: req.user.id,
      status: 'Pending'  // Initial status
    });

    await newOffer.save();
    res.status(201).json({ message: 'Offer created successfully', offer: newOffer });
  } catch (error) {
    res.status(500).json({ message: 'Server error while creating offer' });
  }
};

// Get offers for a specific request
exports.getOffersByRequestId = async (req, res) => {
  try {
    const offers = await Offer.find({ request: req.params.requestId }).populate('user', ['name', 'email']);
    res.status(200).json(offers);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching offers' });
  }
};

// Update offer status (e.g., accept or mark complete)
exports.updateOfferStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }

    // Only the request owner or the helper can update the offer status
    const request = await Request.findById(offer.request);
    if (request.user.toString() !== req.user.id && offer.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to update this offer' });
    }

    // Update the offer status
    offer.status = status || offer.status;
    await offer.save();

    res.status(200).json({ message: 'Offer status updated', offer });
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating offer status' });
  }
};

// Delete an offer
exports.deleteOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }

    // Only the user who made the offer can delete it
    if (offer.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to delete this offer' });
    }

    await offer.remove();
    res.status(200).json({ message: 'Offer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while deleting offer' });
  }
};