const express = require('express');
const router = express.Router();
const {
  addCategory,
  getCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} = require('./categories.controller');

const cache = require('../../middlewares/cache.middleware');
const validate = require('../../middlewares/validate.middleware');
const { authMiddleware } = require('../../middlewares/authMiddleware');
const { checkPermission } = require('../../middlewares/permissionMiddleware');
const { PERMISSION_COLLECTION } = require('../../common/collection/permission.collection');

const createCategoryZodSchema = require('./zod/create-category.zod');
const updateCategoryZodSchema = require('./zod/update-category.zod');
const searchingCategoryZodSchema = require('./zod/searching.zod');
const IdParamsSchema = require('../../common/zod/idParamsSchema.zod');

// 📂 Category CRUD Routes

// Create Category
router.post(
  '/',
  authMiddleware,
  checkPermission(PERMISSION_COLLECTION.CREATE_CATEGORY),
  validate(createCategoryZodSchema, 'body'),
  addCategory
);

// Get Paginated Categories
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

// Get Category By ID
router.get(
  '/:id',
  authMiddleware,
  checkPermission(PERMISSION_COLLECTION.READ_CATEGORIES),
  validate(IdParamsSchema('id'), 'params'),
  getCategoryById
);

// Update Category By ID
router.put(
  '/:id',
  authMiddleware,
  checkPermission(PERMISSION_COLLECTION.UPDATE_CATEGORY),
  validate(IdParamsSchema('id'), 'params'),
  validate(updateCategoryZodSchema, 'body'),
  updateCategoryById
);

// Delete Category By ID (Soft Delete)
router.delete(
  '/:id',
  authMiddleware,
  checkPermission(PERMISSION_COLLECTION.DELETE_CATEGORY),
  validate(IdParamsSchema('id'), 'params'),
  deleteCategoryById
);

module.exports = router;
