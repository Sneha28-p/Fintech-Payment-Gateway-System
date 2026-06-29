const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "No token provided"
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.userId).select("-password");

    if (!req.user) {
      return res.status(401).json({
        message: "User not found"
      });
    }

    req.userId = req.user._id;

    next();

  } catch (err) {
    console.error("Auth error:", err);

    res.status(401).json({
      message: "Invalid token"
    });
  }
};

module.exports = protect;