// controllers/tripController.js

const Trip = require("../models/tripModel");
const Booking = require("../models/bookingModel");
const sendEmail = require("../utils/email");

// Helper to check if trip date is at least 5 days ahead
const isAtLeast5DaysAhead = (targetDate) => {
  const today = new Date();
  const futureDate = new Date(today.setDate(today.getDate() + 5));
  return new Date(targetDate) >= futureDate;
};

// @desc    Create a new trip (Company only)
// @route   POST /company/trips
// @access  Private (company only)
exports.createTrip = async (req, res) => {
  try {
    // Ensure trip date is valid (5+ days in the future)
    if (!isAtLeast5DaysAhead(req.body.date)) {
      return res.status(400).json({
        status: "fail",
        message: "Trip date must be at least 5 days in the future.",
      });
    }

    // Get image URL from body
    const imageUrl = req.body.imageUrl || null;

    // Create a new trip document
    const newTrip = await Trip.create({
      ...req.body,
      company: req.user._id,
      imageUrl,
    });

    res.status(201).json({
      status: "success",
      message: "Trip created successfully",
      data: newTrip,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// @desc    Get all trips created by the logged-in company
// @route   GET /company/trips
// @access  Private (company only)
exports.getCompanyTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ company: req.user._id }).populate(
      "company",
      "companyName"
    );

    res.status(200).json({
      status: "success",
      results: trips.length,
      data: trips,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// @desc    Get all trips (for adventurers or public view)
// @route   GET /trips
// @access  Public
exports.getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find().populate("company", "companyName");

    res.status(200).json({
      status: "success",
      results: trips.length,
      data: trips,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// @desc    Get single trip with its participants (company view)
// @route   GET /company/trips/:tripId
// @access  Private (company only)
exports.getSingleTripWithParticipants = async (req, res) => {
  try {
    const { tripId } = req.params;

    const trip = await Trip.findOne({ _id: tripId, company: req.user._id });
    if (!trip) {
      return res.status(404).json({
        status: "fail",
        message: "Trip not found or you do not have permission to view it.",
      });
    }

    const bookings = await Booking.find({ trip: tripId, status: "confirmed" })
      .select("participants ticketCount adventurer")
      .populate("adventurer", "firstName lastName email phoneNumber");

    res.status(200).json({
      status: "success",
      data: { trip, bookings },
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Helper: check if today is at least 5 days before the given date
const isMoreThan5DaysBefore = (targetDate) => {
  const today = new Date();
  const cutoff = new Date(targetDate);
  cutoff.setDate(cutoff.getDate() - 5);
  return today < cutoff;
};

// @desc    Edit trip (only if 5+ days before the trip date)
// @route   PATCH /company/trips/:tripId
// @access  Private (company only)
exports.editTrip = async (req, res) => {
  try {
    const { tripId } = req.params;

    const trip = await Trip.findOne({ _id: tripId, company: req.user._id });
    if (!trip) {
      return res.status(404).json({
        status: "fail",
        message: "Trip not found or you do not own this trip.",
      });
    }

    if (!isMoreThan5DaysBefore(trip.date)) {
      return res.status(400).json({
        status: "fail",
        message: "Trip cannot be edited less than 5 days before the trip date.",
      });
    }

    const bookings = await Booking.find({
      trip: tripId,
      status: "confirmed",
    }).populate("adventurer", "email firstName");
    for (const booking of bookings) {
      await sendEmail({
        to: booking.adventurer.email,
        subject: "Trip Update Notice",
        text: `Dear ${booking.adventurer.firstName},\n\nYour booked trip "${trip.title}" has been updated. Please check the new trip details on your HikeJo dashboard.\n\nHikeJo Team`,
      });
    }

    const updatedTrip = await Trip.findByIdAndUpdate(tripId, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      message: "Trip updated successfully",
      data: updatedTrip,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// @desc    Delete trip (only if 5+ days before trip date)
// @route   DELETE /company/trips/:tripId
// @access  Private (company only)
exports.deleteTrip = async (req, res) => {
  try {
    const { tripId } = req.params;

    const trip = await Trip.findOne({ _id: tripId, company: req.user._id });
    if (!trip) {
      return res.status(404).json({
        status: "fail",
        message: "Trip not found or not owned by you.",
      });
    }

    if (!isMoreThan5DaysBefore(trip.date)) {
      return res.status(400).json({
        status: "fail",
        message:
          "Trip cannot be deleted less than 5 days before the trip date.",
      });
    }

    const bookings = await Booking.find({
      trip: tripId,
      status: "confirmed",
    }).populate("adventurer", "email firstName");
    for (const booking of bookings) {
      await sendEmail({
        to: booking.adventurer.email,
        subject: "Trip Cancellation Notice",
        text: `Dear ${
          booking.adventurer.firstName
        },\n\nWe regret to inform you that your trip "${
          trip.title
        }" scheduled on ${trip.date.toDateString()} has been cancelled.\n\nWe apologize for the inconvenience.\n\nHikeJo Team`,
      });
    }

    await Trip.findByIdAndDelete(tripId);

    res.status(204).json({
      status: "success",
      message: "Trip deleted successfully",
      data: null,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// @desc    Get trips by company ID (for adventurer/public view)
// @route   GET /companies/:companyId/trips
// @access  Public
exports.getTripsByCompanyId = async (req, res) => {
  try {
    const { companyId } = req.params;

    const trips = await Trip.find({ company: companyId }).populate(
      "company",
      "companyName"
    );

    res.status(200).json({
      status: "success",
      results: trips.length,
      data: trips,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
