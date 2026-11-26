
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const itemRoutes = require("./routes/itemRoutes");
const claimRoutes = require("./routes/claimRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend")));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch((error) => console.log("MongoDB Connection Error:", error.message));

// Item API routes
app.use("/api/items", itemRoutes);
app.use("/api/claims", claimRoutes);
app.use("/api/auth", authRoutes);

// Home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
