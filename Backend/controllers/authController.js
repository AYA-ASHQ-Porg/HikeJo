// modules
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// models
const Adventurer = require('../models/adventurerModel');
const Company = require('../models/companyModel');
const sendEmail = require('../utils/email');


// token generator
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
// signup adventurer
exports.signupAdventurer = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      gender,
      age,
      city,
      email,
      phoneNumber,
      password,
    } = req.body;

// check if the adventurer already exists
    const existingAdventurer = await Adventurer.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    if (existingAdventurer) {
      return res.status(400).json({
        status: 'fail',
        message: 'Email or phone number already exists',
      });
    }
// create a new adventurer
    const newAdventurer = new Adventurer({
      firstName,
      lastName,
      gender,
      age,
      city,
      email,
      phoneNumber,
      password,
    });
// validate the new adventurer
    await newAdventurer.validate();
// hash the password
    newAdventurer.password = await bcrypt.hash(password, 10);
// save the new adventurer
    await newAdventurer.save();
// generate a token
    const token = generateToken(newAdventurer._id);
    newAdventurer.password = undefined;
// send the response
    res.status(201).json({
      status: 'success',
      message: 'Signed up successfully',
      data: {
        adventurer: newAdventurer,
        token,
      },
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((el) => el.message);
      return res.status(400).json({
        status: 'fail',
        message: messages.join(' | '),
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Something went wrong. Please try again.',
    });
  }
};

// login adventurer
exports.loginAdventurer = async (req, res) => {
  try {
    const { email, password } = req.body;
// validate the input
    const dummy = new Adventurer({ email, password });
    const validationErr = dummy.validateSync(['email', 'password']);
    if (validationErr) {
      const messages = Object.values(validationErr.errors).map((el) => el.message);
      return res.status(400).json({
        status: 'fail',
        message: messages.join(' | '),
      });
    }
// check if the adventurer exists
    const adventurer = await Adventurer.findOne({ email }).select('+password');
    if (!adventurer) {
      return res.status(404).json({
        status: 'fail',
        message: 'Adventurer not found',
      });
    }
// check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, adventurer.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid email or password',
      });
    }
// generate a token
    const token = generateToken(adventurer._id);
    adventurer.password = undefined;

    res.status(200).json({
      status: 'success',
      message: 'Logged in successfully',
      data: {
        adventurer,
        token,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong. Please try again.',
    });
  }
};

// signup company
exports.signupCompany = async (req, res) => {
  try {
    const {
      companyName,
      companyId,
      location,
      yearsInBusiness,
      email,
      phoneNumber,
      password
    } = req.body;
// check if the company already exists
    const existingCompany = await Company.findOne({
      $or: [{ email }, { phoneNumber }, { companyId }],
    });

    if (existingCompany) {
      return res.status(400).json({
        status: 'fail',
        message: 'Email, phone number, or Company ID already exists',
      });
    }
// create a new company
    const newCompany = new Company({
      companyName,
      companyId,
      location,
      yearsInBusiness,
      email,
      phoneNumber,
      password
    });
// validate the new company
    await newCompany.validate();
// hash the password
    newCompany.password = await bcrypt.hash(password, 10);
// save the new company
    await newCompany.save();
// generate a token
    const token = generateToken(newCompany._id);
    newCompany.password = undefined;
// send the response
    res.status(201).json({
      status: 'success',
      message: 'Signed up successfully',
      data: {
        company: newCompany,
        token,
      },
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((el) => el.message);
      return res.status(400).json({
        status: 'fail',
        message: messages.join(' | '),
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Something went wrong. Please try again.',
    });
  }
};

// login company
exports.loginCompany = async (req, res) => {
  try {
    const { companyId, password } = req.body;

    const dummy = new Company({ companyId, password });
    const validationErr = dummy.validateSync(['companyId', 'password']);
    if (validationErr) {
      const messages = Object.values(validationErr.errors).map((el) => el.message);
      return res.status(400).json({
        status: 'fail',
        message: messages.join(' | '),
      });
    }
// check if the company exists
    const company = await Company.findOne({ companyId }).select('+password');
    if (!company) {
      return res.status(404).json({
        status: 'fail',
        message: 'Company not found',
      });
    }
    const isPasswordCorrect = await bcrypt.compare(password, company.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid Id or password',
      });
    }
// generate a token
    const token = generateToken(company._id);
    company.password = undefined;
// send the response
    res.status(200).json({
      status: 'success',
      message: 'Logged in successfully',
      data: {
        company,
        token,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong. Please try again.',
    });
  }
};

// Send password reset code (no expiration)
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Look for user in either adventurer or company collection
    const user = await Adventurer.findOne({ email }) || await Company.findOne({ email });

    if (!user) {
      return res.status(404).json({ status: 'fail', message: 'No account with that email found' });
    }

    // Generate 6-digit reset code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Save the code to the user document
    user.passwordResetCode = resetCode;
    await user.save({ validateBeforeSave: false });

    // Send the code via email
    await sendEmail({
      to: email,
      subject: 'HikeJo Password Reset Code',
      text: `Your HikeJo password reset code is: ${resetCode}`
    });

    res.status(200).json({
      status: 'success',
      message: 'Reset code sent to your email'
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

// Verify reset code
exports.verifyResetCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    // Find user in adventurer or company
    const user = await Adventurer.findOne({ email, passwordResetCode: code }) || 
                 await Company.findOne({ email, passwordResetCode: code });

    if (!user) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid reset code or email'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Reset code verified'
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

// Update password after verifying reset code
exports.resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword, confirmPassword } = req.body;

    // Check passwords match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        status: 'fail',
        message: 'Passwords do not match'
      });
    }

    // Find user with matching email and reset code
    const user = await Adventurer.findOne({ email, passwordResetCode: code }) ||
                 await Company.findOne({ email, passwordResetCode: code });

    if (!user) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid email or reset code'
      });
    }

    // Hash new password and save
    const bcrypt = require('bcrypt');
    user.password = await bcrypt.hash(newPassword, 10);
    user.passwordResetCode = undefined;
    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Password has been updated successfully'
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};
