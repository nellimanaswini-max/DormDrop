const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const listingRoutes = require("./routes/listingRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());

// Allow larger JSON payloads for listing images
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/listings", listingRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("🚀 DormDrop Backend is Running!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});