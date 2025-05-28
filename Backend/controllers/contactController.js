const Contact = require("../models/contactModel");
const sendEmail = require("../utils/email"); // NEW: import sendEmail function

// POST /contact
// Store a new contact message and send it to admin email
exports.sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Step 1: Save message to database
    const newMessage = await Contact.create({ name, email, subject, message });

    // Step 2: Send email notification to admin
    await sendEmail({
      to: process.env.EMAIL_USERNAME,
      subject: `New Contact message from ${name} - ${subject}`,
      text: `
        You received a new message from the HikeJo contact form:

        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
      `,
    });

    // Step 3: Response back to client
    res.status(201).json({
      status: "success",
      message: "Your message has been sent successfully!",
      data: newMessage,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Could not send message. Please try again.",
      error: err.message,
    });
  }
};
