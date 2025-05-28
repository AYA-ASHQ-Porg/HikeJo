// modules
const mongoose = require('mongoose');

// schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },

  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    match: [
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      'Please provide a valid email'
    ]
  },

  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true
  },

  message: {
    type: String,
    required: [true, 'Message content is required'],
    trim: true
  }
});

// Export the model
const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;
