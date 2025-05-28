// modules
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// models
const Adventurer = require('../models/adventurerModel');
const Company = require('../models/companyModel');

// middleware to protect routes
const protect = async (req, res, next) => {
  try {
    let token;

    // extract token from Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    // if no token provided
    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: 'You are not logged in. Please log in to access this resource.',
      });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // check if user exists in Adventurer or Company collection
    let currentUser =
      (await Adventurer.findById(decoded.id)) ||
      (await Company.findById(decoded.id));

    if (!currentUser) {
      return res.status(401).json({
        status: 'fail',
        message: 'The user belonging to this token no longer exists.',
      });
    }

    // attach user to the request
    req.user = currentUser;
    next();
  } catch (err) {
    console.error('Protect middleware error:', err);
    return res.status(401).json({
      status: 'fail',
      message: 'Invalid or expired token. Please log in again.',
    });
  }
};

module.exports = protect;
