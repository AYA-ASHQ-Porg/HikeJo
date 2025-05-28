// modules
const mongoose = require("mongoose");

// schema
const tripSchema = new mongoose.Schema({
  // Title of the hike/trip
  title: {
    type: String,
    required: [true, "Trip title is required"],
    trim: true,
  },

  // Date of the hike
  date: {
    type: Date,
    required: [true, "Trip date is required"],
  },

  // Starting location
  startLocation: {
    type: String,
    required: [true, "Starting location is required"],
  },

  // Finishing location
  endLocation: {
    type: String,
    required: [true, "Ending location is required"],
  },

  // Price per ticket
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price must be at least 0"],
  },

  // Minimum age required to join
  ageRequired: {
    type: Number,
    required: [true, "Minimum age is required"],
    min: [0, "Minimum age must be 0 or more"],
  },

  // Maximum total participants
  maxParticipants: {
    type: Number,
    required: [true, "Maximum participants is required"],
    min: [1, "Must allow at least 1 participant"],
  },

  // Maximum tickets one adventurer can book
  maxTicketsPerBooking: {
    type: Number,
    required: [true, "Maximum tickets per booking is required"],
    min: [1, "At least 1 ticket should be allowed"],
    max: [3, "No more than 3 tickets per booking"],
  },

  // The route or path of the trip
  path: {
    type: String,
    required: [true, "Trip path/route is required"],
  },

  // Trip description
  description: {
    type: String,
    required: [true, "Trip description is required"],
  },

  // Contact phone number of the company
  companyPhoneNumber: {
    type: String,
    required: [true, "Company phone number is required"],
    match: [
      /^\+9627[789]\d{7}$/,
      "Please provide a valid Jordanian phone number",
    ],
  },

  // Optional image
  imageUrl: {
    type: String,
    default: null,
  },

  // Difficulty level
  difficultyLevel: {
    type: String,
    enum: ["easy", "moderate", "hard", "expert"],
    required: [true, "Difficulty level is required"],
  },

  // Reference to the company who created the trip
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: [true, "Trip must belong to a company"],
  },
});

// Export the model
const Trip = mongoose.model("Trip", tripSchema);
module.exports = Trip;
