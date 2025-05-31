// routes/companyTripRouter.js

const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');
const protect = require('../middlewares/protect');
const restrictTo = require('../middlewares/restrictTo');

// Apply middlewares
router.use(protect);
router.use(restrictTo('company'));

// GET all trips by the company
router.get('/', tripController.getCompanyTrips);

// POST a new trip 
router.post('/', tripController.createTrip);

// GET a single trip with participant data
router.get('/:tripId', tripController.getSingleTripWithParticipants);

// PATCH to edit a trip
router.patch('/:tripId', tripController.editTrip);

// DELETE a trip
router.delete('/:tripId', tripController.deleteTrip);

module.exports = router;
