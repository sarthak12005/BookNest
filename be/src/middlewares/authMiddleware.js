// src/middlewares/verifyToken.js
const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 👇 Attach decoded token to req.user
    req.user = {
       userId: decoded.userId,
    };

    next();
  } catch (error) {
    console.error("JWT Error:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
