const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { addReview } = require('../controllers/review.controller');
const router = express.Router();

router.use(authMiddleware)

router.post('/', addReview);

module.exports = router;



