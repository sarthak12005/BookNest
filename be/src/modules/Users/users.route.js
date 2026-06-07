const express = require('express');
const validate = require('../../middlewares/validate.middleware');
const { checkPermission } = require('../../middlewares/permissionMiddleware');
const { PERMISSION_COLLECTION } = require('../../common/collection/permission.collection');
const IdParamsSchema = require('../../common/zod/idParamsSchema.zod');
const updateProfileSchema = require('./zod/update-profile.zod');
const {
  addToWishlist,
  getWishlist,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getMyProfile,
  updateMyProfile
} = require('./users.controller');
const { authMiddleware } = require('../../middlewares/authMiddleware');
const router = express.Router();

// ─── SELF PROFILE ROUTES (Must be defined before parameterized routes) ────────
router.get(
  '/profile',
  authMiddleware,
  checkPermission(PERMISSION_COLLECTION.READ_PROFILE),
  getMyProfile
);

router.patch(
  '/profile',
  authMiddleware,
  checkPermission(PERMISSION_COLLECTION.UPDATE_PROFILE),
  validate(updateProfileSchema, 'body'),
  updateMyProfile
);

// ─── WISHLIST ROUTES (Must be defined before parameterized routes) ────────────
router.get(
  '/wishlist',
  authMiddleware,
  checkPermission(PERMISSION_COLLECTION.READ_WISHLIST),
  getWishlist
);

router.patch(
  '/wishlist/:bookId',
  authMiddleware,
  checkPermission(PERMISSION_COLLECTION.ADD_TO_WISHLIST),
  validate(IdParamsSchema("bookId"), "params"),
  addToWishlist
);

// ─── ADMIN-ONLY USERS DIRECTORY CRUD ROUTES ───────────────────────────────────
router.get(
  '/',
  authMiddleware,
  checkPermission(PERMISSION_COLLECTION.MANAGE_USERS),
  getUsers
);

router.get(
  '/:id',
  authMiddleware,
  checkPermission(PERMISSION_COLLECTION.MANAGE_USERS),
  validate(IdParamsSchema('id'), 'params'),
  getUserById
);

router.patch(
  '/:id',
  authMiddleware,
  checkPermission(PERMISSION_COLLECTION.MANAGE_USERS),
  validate(IdParamsSchema('id'), 'params'),
  updateUser
);

router.delete(
  '/:id',
  authMiddleware,
  checkPermission(PERMISSION_COLLECTION.MANAGE_USERS),
  validate(IdParamsSchema('id'), 'params'),
  deleteUser
);

module.exports = router;

