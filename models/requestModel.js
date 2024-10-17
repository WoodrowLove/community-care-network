const mongoose = require('mongoose');

// Define Help Request Schema
const RequestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Groceries', 'Yard Work', 'Tutoring', 'Other'], 
    required: true
  },
  time_frame: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Create and export Request model
const Request = mongoose.model('Request', RequestSchema);
module.exports = Request;