const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/db");

// connect DB
connectDB();

// middleware
app.use(express.json());

// routes
const authRoutes = require("./routes/authRoutes");
const walletRoutes = require("./routes/walletRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/payment", paymentRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API running");
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));