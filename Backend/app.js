// modules
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const authRouter = require("./routes/authRouter");
const protect = require("./middlewares/protect");
const restrictTo = require("./middlewares/restrictTo");
const adventurerRouter = require("./routes/adventurerRouter");
const companyRouter = require("./routes/companyRouter");
const companyTripRouter = require("./routes/companyTripRouter");
const tripPublicRouter = require("./routes/tripPublicRouter");
const contactRouter = require("./routes/contactRouter");
const staticPageRouter = require("./routes/staticPageRouter");
const publicCompanyRouter = require("./routes/publicCompanyRouter");

// initializing the express app
const app = express();

// CORS Middleware
app.use(
  cors({
    origin: "http://localhost:3001", // frontend Vite default
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Parse JSON request bodies
app.use(express.json());

// Logging middleware
app.use(morgan("dev"));

// Routes
app.use("/auth", authRouter);
app.use("/adventurer", adventurerRouter);
app.use("/company/trips", companyTripRouter); 
app.use("/company", companyRouter);
app.use("/trips", tripPublicRouter);
app.use("/contact", contactRouter);
app.use("/pages", staticPageRouter);
app.use("/companies", publicCompanyRouter);

// exporting the app
module.exports = app;
