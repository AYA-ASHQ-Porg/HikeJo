// modules
const mongoose = require('mongoose');

// schema
const bookingSchema = new mongoose.Schema({
  // Reference to the booked trip
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: [true, 'Booking must be linked to a trip']
  },

  // Reference to the adventurer who made the booking
  adventurer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Adventurer',
    required: [true, 'Booking must be linked to an adventurer']
  },

  // Embedded list of participants
  participants: [
    {
      name: {
        type: String,
        required: [true, 'Participant name is required']
      },
      age: {
        type: Number,
        required: [true, 'Participant age is required'],
        min: [1, 'Age must be at least 1']
      },
      gender: {
        type: String,
        enum: ['male', 'female'],
        required: [true, 'Participant gender is required']
      },
      phoneNumber: {
        type: String,
        required: [true, 'Participant phone number is required'],
        match: [/^\+9627[789]\d{7}$/, 'Please provide a valid Jordanian phone number']
      },
      email: {
        type: String,
        required: [true, 'Participant email is required'],
        match: [
          /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
          'Please provide a valid email'
        ]
      }
    }
  ],

  // Total number of tickets in this booking
  ticketCount: {
    type: Number,
    required: [true, 'Ticket count is required'],
    min: [1, 'Must book at least 1 ticket'],
    max: [3, 'Cannot book more than 3 tickets']
  },

  // Status: confirmed or cancelled
  status: {
    type: String,
    enum: ['confirmed', 'cancelled'],
    default: 'confirmed'
  },

  // Booking creation date
  bookedAt: {
    type: Date,
    default: Date.now
  }
});

// Export the model
const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
