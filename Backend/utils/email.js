const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, 
  },
});

const sendEmail = async ({ to, subject, text, html }) => {
  const mailOptions = {
    from: `"HikeJo Team" <${process.env.EMAIL_USERNAME}>`,
    to,
    subject,
    text,
    html: html || `<p>${text.replace(/\n/g, "<br>")}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}`);
  } catch (err) {
    console.error(`❌ Failed to send email to ${to}:`, err.message);
  }
};

module.exports = sendEmail;
