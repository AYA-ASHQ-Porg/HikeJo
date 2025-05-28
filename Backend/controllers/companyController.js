// controllers/companyController.js

const Company = require("../models/companyModel");

// GET /company/profile
// Get the currently logged-in company's profile
exports.getCompanyProfile = async (req, res) => {
  try {
    const company = await Company.findById(req.user.id);

    if (!company) {
      return res.status(404).json({ message: "No company found with this ID" });
    }

    res.status(200).json({
      status: "success",
      data: company,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// PATCH /company/profile
// Update logged-in company profile details
exports.updateCompanyProfile = async (req, res) => {
  try {
    // Check if request body is empty
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "No data provided to update" });
    }

    // Disallowed fields
    const disallowedFields = ["password", "email", "role"];
    disallowedFields.forEach((field) => {
      if (req.body[field] !== undefined) delete req.body[field];
    });

    const updatedCompany = await Company.findByIdAndUpdate(
      req.user.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCompany) {
      return res.status(404).json({ message: "No company found with this ID" });
    }

    res.status(200).json({
      status: "success",
      data: updatedCompany,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// DELETE /company/delete-account
// Delete the logged-in company account
exports.deleteCompanyAccount = async (req, res) => {
  try {
    const deletedCompany = await Company.findByIdAndDelete(req.user.id);

    if (!deletedCompany) {
      return res.status(404).json({ message: "No company found with this ID" });
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
