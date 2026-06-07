const express = require('express');
const validate = require('../../middlewares/validate.middleware');
const { checkPermission } = require('../../middlewares/permissionMiddleware');
const { PERMISSION_COLLECTION } = require('../../common/collection/permission.collection');
const IdParamsSchema = require('../../common/zod/idParamsSchema.zod');
const { addToWishlist, getWishlist } = require('./users.controller');
const { authMiddleware } = require('../../middlewares/authMiddleware');
const router = express.Router();

// router.get('/user', permission('manage', 'all'), cache('Users'), getUsers);
// router.post('/user', permission('manage', 'all'), createUser);
// router.get('/user/:id', permission('manage', 'all'), getUserById);

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

module.exports = router;

