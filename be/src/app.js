require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const cookieParser = require('cookie-parser');


const app = express();

const client_url1 = process.env.CLIENT_URL1
const client_url2 = process.env.CLIENT_URL2



app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true, limit: '50mb'}));

app.use(cors({
    origin: [client_url1, client_url2],
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

app.get('/', (req, res) => {
    res.send("Hello world!");
});

module.exports = app;