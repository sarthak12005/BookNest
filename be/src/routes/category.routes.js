const express = require('express');
const router = express.Router();
const { addCategory, getCategory, getCategoryById, deleteCategoryById } = require('../controllers/category.controller');
const { cache } = require('../middlewares/cache.middleware');


router.post('/category', addCategory);
router.get('/category',cache("categories"), getCategory);
router.get('/category/:id', getCategoryById);
router.delete('/category/:id', deleteCategoryById);


module.exports = router;