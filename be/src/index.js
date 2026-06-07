require('./config/dns');
require('dotenv').config();
const connectDB = require('./config/db');
const app = require('./app');
const logger = require('./utils/logger');
const runSeeder = require('./database/seeders/seedRequired');
const PORT = process.env.PORT;

runSeeder();
connectDB();

app.listen(PORT, () => {
  logger.info(`Server is running on ${PORT}`);
});
