const express = require('express');
const router = express.Router();
const { addCategory, getCategory, getCategoryById, deleteCategoryById } = require('../controllers/category.controller');


router.post('/category', addCategory);
router.get('/category', getCategory);
router.get('/category/:id', getCategoryById);
router.delete('/category/:id', deleteCategoryById);


module.exports = router;