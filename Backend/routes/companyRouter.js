
const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const sendEmail = require('../utils/email');

// Middlewares for authentication and role protection
const protect = require('../middlewares/protect');
const restrictTo = require('../middlewares/restrictTo');

// Apply protection and role restriction to all following routes
router.use(protect);
router.use(restrictTo('company'));

// Routes for company profile management
router.get('/profile', companyController.getCompanyProfile);
router.patch('/profile', companyController.updateCompanyProfile);
router.delete('/delete-account', companyController.deleteCompanyAccount);

module.exports = router;
