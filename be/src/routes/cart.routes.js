const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');


router.use(authMiddleware);







module.exports = router;