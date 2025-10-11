require('dotenv').config();
const express = require('express');
const cors = require('cors');

require('./src/config/db');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true
}));


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
