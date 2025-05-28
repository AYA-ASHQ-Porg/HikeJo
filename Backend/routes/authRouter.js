//modules
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");


// adventurer signup
router.post("/signup/adventurer", authController.signupAdventurer);
// adventurer login
router.post("/login/adventurer", authController.loginAdventurer);

// company signup
router.post("/signup/company", authController.signupCompany);
// company login
router.post("/login/company", authController.loginCompany);

// forgot password
router.post('/forgot-password', authController.forgotPassword);

// reset password
router.post('/verify-reset-code', authController.verifyResetCode);

// update password
router.post('/reset-password', authController.resetPassword);

//export
module.exports = router;