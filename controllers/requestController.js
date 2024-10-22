const Request = require('../models/requestModel');

// Create a new request
exports.createRequest = async (req, res) => {
  const { title, description, location, category, time_frame } = req.body;

  try {
    // Create a new request in the database
    const newRequest = new Request({
      title,
      description,
      location,
      category,
      time_frame,
      user: req.user.id, // Assuming the user is logged in
      status: 'Pending'
    });

    await newRequest.save();
    
    // Send the newly created request as a response
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(500).json({ message: 'Error creating request', error: err.message });
  }
};

// Get all requests
exports.getRequests = async (req, res) => {
  try {
    const requests = await Request.find();
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching requests', error: err.message });
  }
};

// Get requests by user
exports.getUserRequests = async (req, res) => {
  try {
    const userId = req.user.id;
    const userRequests = await Request.find({ user: userId });
    res.status(200).json(userRequests);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user requests', error: err.message });
  }
};

// Delete a request
exports.deleteRequest = async (req, res) => {
  try {
    const requestId = req.params.id;
    await Request.findByIdAndDelete(requestId);
    res.status(200).json({ message: 'Request deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting request', error: err.message });
  }
};

// Mark a request as complete
exports.markAsComplete = async (req, res) => {
  try {
    const requestId = req.params.id;
    await Request.findByIdAndUpdate(requestId, { status: 'Completed' });
    res.status(200).json({ message: 'Request marked as complete' });
  } catch (err) {
    res.status(500).json({ message: 'Error marking request as complete', error: err.message });
  }
};