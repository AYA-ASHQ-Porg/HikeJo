const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const protect = require('../middlewares/protect');

// Only authenticated users (adventurer or company) can send messages
router.post('/', protect, contactController.sendMessage);

module.exports = router;
