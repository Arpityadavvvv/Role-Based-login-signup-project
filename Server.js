const express = require("express");  // Make sure to import express
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());  // Allows Express to parse JSON bodies in requests
app.use(cors());  // Allows cross-origin requests

// Routes
app.use("/api/auth", require("./Routes/auth"));  // Make sure the path to your routes is correct

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);  // Exit process if the database connection fails
  });

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

