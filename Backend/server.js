const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const mongoose = require("mongoose");
const app = require("./app");
const ngrok = require("ngrok");

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to the database");
  })
  .catch((err) => {
    console.log("❌ Error connecting to the database", err);
  });

const server = app.listen(process.env.PORT, async () => {
  console.log(`🚀 Server is running on port ${process.env.PORT}`);

  if (process.env.NODE_ENV === "development") {
    try {
      const url = await ngrok.connect(process.env.PORT);
      console.log(`🌐 Ngrok is running at: ${url}`);
      process.env.NGROK_URL = url;
    } catch (error) {
      console.error("❌ Failed to start Ngrok tunnel:", error.message);
    }
  }
});