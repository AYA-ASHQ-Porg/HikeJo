// controllers/adventurerController.js

const Adventurer = require('../models/adventurerModel');

// GET /adventurer/profile
// Get the currently logged-in adventurer's profile
exports.getAdventurerProfile = async (req, res) => {
  try {
    const adventurer = await Adventurer.findById(req.user.id);

    if (!adventurer) {
      return res.status(404).json({ message: 'No adventurer found with this ID' });
    }

    res.status(200).json({
      status: 'success',
      data: adventurer
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// PATCH /adventurer/profile
// Update logged-in adventurer profile details
exports.updateAdventurerProfile = async (req, res) => {
  try {
    // Disallowed fields
    const disallowedFields = ['password', 'email', 'role'];
    disallowedFields.forEach(field => {
      if (req.body[field]) delete req.body[field];
    });

    const updatedAdventurer = await Adventurer.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedAdventurer) {
      return res.status(404).json({ message: 'No adventurer found with this ID' });
    }

    res.status(200).json({
      status: 'success',
      data: updatedAdventurer
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// DELETE /adventurer/delete-account
// Delete the logged-in adventurer account
exports.deleteAdventurerAccount = async (req, res) => {
  try {
    const deletedAdventurer = await Adventurer.findByIdAndDelete(req.user.id);

    if (!deletedAdventurer) {
      return res.status(404).json({ message: 'No adventurer found with this ID' });
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


