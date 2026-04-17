const express = require('express');
const router = express.Router();
const { addCategory, getCategory, getCategoryById, deleteCategoryById } = require('./categories.controller');
const { cache } = require('../../middlewares/cache.middleware');
const validate = require('../../middlewares/validate.middleware');
const searchingCategoryZodSchema = require('./zod/searching.zod');


// router.post('/category', addCategory);
router.get(
    '/',cache("categories"),validate(searchingCategoryZodSchema, "query"), getCategory);
// router.get('/category/:id', getCategoryById);
// router.delete('/category/:id', deleteCategoryById);


module.exports = router;