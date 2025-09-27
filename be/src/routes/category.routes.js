const express = require('express');
const router = express.Router();
const { addCategory, getCategory } = require('../controllers/category.controller');


router.post('/category', addCategory);
router.get('/category', getCategory);


module.exports = router;