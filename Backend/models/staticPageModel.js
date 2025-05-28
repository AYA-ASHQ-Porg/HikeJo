const mongoose = require('mongoose');

// Define schema for static content pages
const staticPageSchema = new mongoose.Schema({
  // Unique identifier for the page (e.g., 'about', 'faq', 'terms', 'privacy')
  slug: {
    type: String,
    required: [true, 'Page slug is required'],
    unique: true,
    enum: ['about', 'faq', 'terms', 'privacy'],
    lowercase: true
  },

  // Full HTML content of the page
  htmlContent: {
    type: String,
    required: [true, 'Page content is required']
  },

  // Last updated timestamp
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create the model
const StaticPage = mongoose.model('StaticPage', staticPageSchema);
module.exports = StaticPage;
