const express = require('express');
const router = express.Router();
const { addCategory, getCategory, getCategoryById } = require('../controllers/category.controller');


router.post('/category', addCategory);
router.get('/category', getCategory);
router.get('/category/:id', getCategoryById);


module.exports = router;