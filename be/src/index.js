require('dotenv').config();
const connectDB = require('./config/db');
const app = require('./app');
const logger = require('./utils/logger');
const PORT = process.env.PORT;

connectDB();

app.listen(PORT, () => {
  logger.info(`Server is running on ${PORT}`);
});
