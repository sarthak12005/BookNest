const express = require('express');
const router = express.Router();
const {
  addCategory,
  getCategory,
  getCategoryById,
  deleteCategoryById,
} = require('./categories.controller');
const  cache  = require('../../middlewares/cache.middleware');
const validate = require('../../middlewares/validate.middleware');
const searchingCategoryZodSchema = require('./zod/searching.zod');
const { authMiddleware } = require('../../middlewares/authMiddleware');
const { checkPermission } = require('../../middlewares/permissionMiddleware');
const { PERMISSION_COLLECTION } = require('../../common/collection/permission.collection');

// router.post('/category', addCategory);
router.get(
  '/',
  authMiddleware,
  checkPermission(PERMISSION_COLLECTION.READ_CATEGORIES),
  cache({
    keyPrefix: 'categories',
    ttl: 60,
  }),
  validate(searchingCategoryZodSchema, 'query'),
  getCategory
);
router.get(
  '/:id',
  authMiddleware,
  checkPermission(PERMISSION_COLLECTION.READ_CATEGORIES),
  getCategoryById
);
router.delete(
  '/:id',
  authMiddleware,
  checkPermission(PERMISSION_COLLECTION.READ_CATEGORIES),
  deleteCategoryById
);

module.exports = router;
