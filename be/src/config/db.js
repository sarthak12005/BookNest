require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.log("Error Connecting Database: ", err))


module.exports = mongoose;