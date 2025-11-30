const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { getCart, addToCart } = require('../controllers/cart.controller');


router.use(authMiddleware);
router.get('/', getCart);
router.post('/', addToCart);







module.exports = router;