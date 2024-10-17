const Request = require('../models/requestModel');
const User = require('../models/userModel');

// Create a new help request
exports.createRequest = async (req, res) => {
  const { title, description, location, category, time_frame } = req.body;

  try {
    const newRequest = new Request({
      title,
      description,
      location,
      category,
      time_frame,
      user: req.user.id  // Attach logged-in user as the creator
    });

    await newRequest.save();
    res.status(201).json({ message: 'Help request created successfully', request: newRequest });
  } catch (error) {
    res.status(500).json({ message: 'Server error while creating request' });
  }
};

// Get all help requests (for the homepage or listing)
exports.getRequests = async (req, res) => {
  try {
    const requests = await Request.find().populate('user', ['name', 'email']);
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching requests' });
  }
};

// Get a specific request by ID
exports.getRequestById = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id).populate('user', ['name', 'email']);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching request' });
  }
};

// Update an existing help request
exports.updateRequest = async (req, res) => {
  const { title, description, location, category, time_frame, status } = req.body;

  try {
    const request = await Request.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Only allow the request creator to update
    if (request.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to update this request' });
    }

    // Update request fields
    request.title = title || request.title;
    request.description = description || request.description;
    request.location = location || request.location;
    request.category = category || request.category;
    request.time_frame = time_frame || request.time_frame;
    request.status = status || request.status;

    await request.save();
    res.status(200).json({ message: 'Request updated successfully', request });
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating request' });
  }
};

// Delete a help request
exports.deleteRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Only allow the request creator to delete
    if (request.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to delete this request' });
    }

    await request.remove();
    res.status(200).json({ message: 'Request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while deleting request' });
  }
};