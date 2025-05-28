const express = require("express");
const Company = require("../models/companyModel");
const Trip = require("../models/tripModel");
const protect = require("../middlewares/protect");
const restrictTo = require("../middlewares/restrictTo");

const router = express.Router();

// Middleware: Only logged-in adventurers can access these routes
router.use(protect);
router.use(restrictTo("adventurer"));

// @desc    Get all companies (adventurer only)
// @route   GET /companies
router.get("/", async (req, res) => {
  try {
    const companies = await Company.find(
      {},
      "companyName location website aboutCompany"
    );
    res.status(200).json({
      status: "success",
      results: companies.length,
      data: companies,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// @desc    Get all trips for a specific company (adventurer only)
// @route   GET /companies/:id/trips
router.get("/:id/trips", async (req, res) => {
  try {
    const { id } = req.params;

    const company = await Company.findById(id);
    if (!company) {
      return res
        .status(404)
        .json({ status: "fail", message: "Company not found" });
    }

    const trips = await Trip.find({ company: id }).populate(
      "company",
      "companyName"
    );

    res.status(200).json({
      status: "success",
      companyName: company.companyName,
      results: trips.length,
      data: trips,
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

module.exports = router;
