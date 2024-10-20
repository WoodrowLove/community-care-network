// Define Offer Schema
const mongoose = require('mongoose');

const OfferSchema = new mongoose.Schema({
    request: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Request',  // Reference to the Request model
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  // Reference to the User model (the helper)
      required: true
    },
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'Completed'],
      default: 'Pending'
    },
    created_at: {
      type: Date,
      default: Date.now
    }
  });
  
  // Create and export Offer model
  const Offer = mongoose.model('Offer', OfferSchema);
  module.exports = Offer;