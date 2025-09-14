require('dotenv').config();
const express = require('express');
const cors = require('cors');

require('./src/config/db');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}));


const authRoutes = require('./src/routes/auth.routes');


app.get('/', (req, res) => {
    res.send("Server is running..");
});


app.use('/api/auth', authRoutes);


app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
})
