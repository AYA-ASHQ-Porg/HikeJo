// routes/tripPublicRouter.js

const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// @desc Get all upcoming trips (public)
// @route GET /trips
// @access Public
router.get('/', bookingController.getAllUpcomingTrips);

module.exports = router;
