// modules
const mongoose = require('mongoose');

// schema
const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },

  companyId: {
    type: String,
    required: [true, 'Company ID is required'],
    unique: true,
    trim: true
  },

  location: {
    type: String,
    required: [true, 'Location is required']
  },

  yearsInBusiness: {
    type: Number,
    required: [true, 'Years in business is required'],
    min: [0, 'Years in business cannot be negative']
  },

  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      'Please provide a valid email'
    ]
  },

  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^\+9627[789]\d{7}$/, 'Please provide a valid Jordanian phone number']
  },

  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 8
  },

  // Optional website URL
  website: {
    type: String,
    default: null,
    trim: true
  },

  // Optional about section
  aboutCompany: {
    type: String,
    default: null,
    trim: true
  },

  // Fixed role
  role: {
    type: String,
    enum: ['company'], 
    default: 'company'
  },

  passwordResetCode: {
  type: String,
  select: false
}

});

// Export the model
const Company = mongoose.model('Company', companySchema);
module.exports = Company;
