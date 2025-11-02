require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

require('./src/config/db');

const app = express();
const PORT = process.env.PORT;
const client_url1 = process.env.CLIENT_URL1
const client_url2 = process.env.CLIENT_URL2

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({
    origin: [client_url1, client_url2],
    credentials: true
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after 15 minutes."
  },
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false, // Disable X-RateLimit headers
});

// Apply limiter to all routes
app.use(limiter);


const authRoutes = require('./src/routes/auth.routes');
const categoryRoutes = require('./src/routes/category.routes');
const bookRoutes = require('./src/routes/book.routes');


app.get('/', (req, res) => {
    res.send("Server is running..");
});


app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/book', bookRoutes);


app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});
