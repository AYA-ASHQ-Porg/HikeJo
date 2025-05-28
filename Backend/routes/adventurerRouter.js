// This file defines the routes for managing adventurer profiles in the application.
const express = require("express");
const router = express.Router();
const adventurerController = require("../controllers/adventurerController");
const bookingController = require("../controllers/bookingController");

// Middlewares for authentication and role protection
const protect = require("../middlewares/protect");
const restrictTo = require("../middlewares/restrictTo");

// Protect all routes after this middleware
router.use(protect);
router.use(restrictTo("adventurer"));

// Routes for adventurer profile management
router.get("/profile", adventurerController.getAdventurerProfile);
router.patch("/profile", adventurerController.updateAdventurerProfile);
router.delete("/delete-account", adventurerController.deleteAdventurerAccount);

// Add this route for booking a trip
router.post("/book/:tripId", bookingController.bookTrip);

// Get all bookings for the logged-in adventurer
router.get("/my-hikes", bookingController.getMyBookings);

// Cancel a booking
router.patch("/cancel-booking/:bookingId", bookingController.cancelBooking);

// Check if adventurer already booked a trip
router.get("/already-booked/:tripId", bookingController.checkIfAlreadyBooked);

module.exports = router;
