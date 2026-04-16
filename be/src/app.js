require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const client_urls = process.env.CLIENT_URLS.split(',');

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true, limit: '50mb'}));

app.use(cors({
    origin: client_urls,
    credentials: true
}));

app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after 15 minutes."
  },
  standardHeaders: true, 
  legacyHeaders: false,
});

app.use(limiter);



app.get('/api/server', (req, res) => {
    res.send("Hello world!");
});

const authRoutes = require('./modules/Auth/auth.routes');

app.use('/api/auth', authRoutes);

module.exports = app;