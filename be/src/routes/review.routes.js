const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { addReview, getReviews, getReviewById, deleteReview } = require('../controllers/review.controller');
const { cache } = require('../middlewares/cache.middleware');
const router = express.Router();

router.use(authMiddleware)

router.post('/', addReview);
router.get('/', cache("reviews"), getReviews);
router.get('/:id',getReviewById);
router.delete('/:id', deleteReview);

module.exports = router;



