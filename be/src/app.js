require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const client_urls = process.env.CLIENT_URLS.split(',');

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(
  cors({
    origin: client_urls,
    credentials: true,
  })
);

app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes.',
    data: {},
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

app.get('/api/server', (req, res) => {
  res.send('Hello world!');
});

const authRoutes = require('./modules/Auth/auth.routes'); // auth routes
const categoriesRoutes = require('./modules/Categories/categories.routes'); // category routes
const booksRoutes = require('./modules/Books/books.routes'); // books routes 
const usersRoutes = require('./modules/Users/users.route'); // users routes
const rolesRoutes = require('./modules/Roles/roles.routes'); // roles routes
const permissionsRoutes = require('./modules/Permissions/permissions.routes'); // permissions routes
const errorMiddleware = require('./middlewares/error.middleware');

app.use('/api/auth', authRoutes); 
app.use('/api/category', categoriesRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/permissions', permissionsRoutes);

app.use(errorMiddleware);

module.exports = app;
