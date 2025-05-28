const express = require('express');
const router = express.Router();
const staticPageController = require('../controllers/staticPageController');

// Public route to get any static page by slug
router.get('/:slug', staticPageController.getPageContent);

module.exports = router;
