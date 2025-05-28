// controllers/bookingController.js

const Booking = require('../models/bookingModel');
const Trip = require('../models/tripModel');

// Helper: check if today is at least 5 days before the trip date
const isMoreThan5DaysBefore = (tripDate) => {
  const today = new Date();
  const cutoff = new Date(tripDate);
  cutoff.setDate(cutoff.getDate() - 5);
  return today < cutoff;
};

// @desc    Book a trip (adventurer only)
// @route   POST /adventurer/book/:tripId
// @access  Private (adventurer only)
exports.bookTrip = async (req, res) => {
  try {
    const { tripId } = req.params;
    const { participants, ticketCount } = req.body;

    // Step 1: Find the trip
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ status: 'fail', message: 'Trip not found' });
    }

    // Step 2: Check trip date (must be at least 5 days away)
    if (!isMoreThan5DaysBefore(trip.date)) {
      return res.status(400).json({ status: 'fail', message: 'Booking is not allowed less than 5 days before the trip date.' });
    }

    // Step 3: Check ticketCount limits
    if (ticketCount < 1 || ticketCount > 3 || ticketCount > trip.maxTicketsPerBooking) {
      return res.status(400).json({ status: 'fail', message: 'Invalid ticket count.' });
    }

    // Step 4: Check if adventurer has already booked this trip
    const alreadyBooked = await Booking.findOne({ adventurer: req.user._id, trip: tripId, status: 'confirmed' });
    if (alreadyBooked) {
      return res.status(400).json({ status: 'fail', message: 'You have already booked this trip.' });
    }

    // Step 5: Create booking
    const booking = await Booking.create({
      trip: tripId,
      adventurer: req.user._id,
      participants,
      ticketCount
    });

    res.status(201).json({
      status: 'success',
      message: 'Booking confirmed',
      data: booking
    });
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ status: 'error', message: err.message });
  }
};

// @desc    Get all bookings for the logged-in adventurer
// @route   GET /adventurer/my-hikes
// @access  Private (adventurer only)
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ adventurer: req.user._id }).populate("trip");

    const today = new Date();
    const upcoming = [];
    const cancelled = [];
    const past = [];

    bookings.forEach((booking) => {
      // Ensure trip and date exist
      if (!booking.trip || !booking.trip.date) {
        return;
      }

      if (booking.status === "cancelled") {
        cancelled.push(booking);
      } else if (new Date(booking.trip.date) < today) {
        past.push(booking);
      } else {
        upcoming.push(booking);
      }
    });

    res.status(200).json({
      status: "success",
      data: {
        upcoming,
        cancelled,
        past,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// @desc    Cancel a booking (adventurer only)
// @route   PATCH /adventurer/cancel-booking/:bookingId
// @access  Private (adventurer only)
exports.cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    // Step 1: Find booking and check ownership
    const booking = await Booking.findOne({ _id: bookingId, adventurer: req.user._id }).populate('trip');
    if (!booking) {
      return res.status(404).json({ status: 'fail', message: 'Booking not found' });
    }

    // Step 2: Check time limit (5+ days before trip)
    if (!isMoreThan5DaysBefore(booking.trip.date)) {
      return res.status(400).json({ status: 'fail', message: 'Cannot cancel less than 5 days before the trip.' });
    }

    // Step 3: Update status to cancelled
    booking.status = 'cancelled';
    await booking.save();

    res.status(200).json({
      status: 'success',
      message: 'Booking cancelled successfully',
      data: booking
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

// @desc    Check if adventurer already booked a trip
// @route   GET /adventurer/already-booked/:tripId
// @access  Private (adventurer only)
exports.checkIfAlreadyBooked = async (req, res) => {
  try {
    const { tripId } = req.params;
    const adventurerId = req.user && req.user._id;

    if (!adventurerId || !tripId) {
      return res.status(400).json({ status: 'fail', message: 'Missing required parameters' });
    }

    const bookingExists = await Booking.exists({
      trip: tripId,
      adventurer: adventurerId,
      status: 'confirmed'
    });

    res.status(200).json({
      status: 'success',
      alreadyBooked: Boolean(bookingExists)
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

// @desc    Get all upcoming trips (public)
// @route   GET /trips
// @access  Public
exports.getAllUpcomingTrips = async (req, res) => {
  try {
    const today = new Date();
    const trips = await Trip.find({ date: { $gte: today } }).populate('company', 'companyName location');

    res.status(200).json({
      status: 'success',
      results: trips.length,
      data: trips
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};
