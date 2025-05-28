// modules
const mongoose = require('mongoose');

// schemas 
const adventurerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },

  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },

  gender: {
    type: String,
    enum: ['male', 'female'],
    required: [true, 'Gender is required']
  },

  age: {
    type: Number,
    min: [16, 'Minimum age is 16'],
    required: [true, 'Age is required']
  },

  city: {
    type: String,
    required: [true, 'City is required']
  },

  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [
  /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  'Please provide a valid email',
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
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false
  },

  role: {
    type: String,
    enum: ['adventurer'], 
    default: 'adventurer'
  },

  passwordResetCode: {
  type: String,
  select: false
}
});

// Export the model
const Adventurer = mongoose.model('Adventurer', adventurerSchema);
module.exports = Adventurer;
