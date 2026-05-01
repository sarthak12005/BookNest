// src/config/db.js

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME || 'myApp',
    });

    console.log(`✅ MongoDB Connected!`);
  } catch (error) {
    console.error('❌ Database connection error:', error.message);

    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
