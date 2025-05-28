const StaticPage = require('../models/staticPageModel');

// GET /pages/:slug
// Publicly get static content (about, faq, terms, privacy)
exports.getPageContent = async (req, res) => {
  try {
    const { slug } = req.params;

    // Find the page by its slug (e.g., 'about', 'terms', etc.)
    const page = await StaticPage.findOne({ slug });

    // If page not found, return 404
    if (!page) {
      return res.status(404).json({
        status: 'fail',
        message: `Page with slug '${slug}' not found`
      });
    }

    // Send page content
    res.status(200).json({
      status: 'success',
      data: {
        slug: page.slug,
        htmlContent: page.htmlContent,
        updatedAt: page.updatedAt
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Server error while retrieving static page',
      error: err.message
    });
  }
};
