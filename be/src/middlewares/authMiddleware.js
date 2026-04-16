// src/middlewares/verifyToken.js
const jwt = require("jsonwebtoken");
const { defineAbilitiesFor } = require('../src/casl/ability');
const User = require("../src/models/User");
require('dotenv').config();

exports.authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: decoded.userId })


    if (!user)
      return res.status(401).json({ message: "User not found" });



    // 👇 Attach decoded token to req.user
    req.user = {
      userId: user._id
    };

    

    req.ability = defineAbilitiesFor(user);

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
