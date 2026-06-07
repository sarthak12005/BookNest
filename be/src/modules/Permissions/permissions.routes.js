const express = require('express');
const router = express.Router();

const {
  createPermission,
  getPermissions,
  getPermissionById,
  updatePermission,
  deletePermission,
} = require('./permissions.controller');

const validate = require('../../middlewares/validate.middleware');
const { authMiddleware } = require('../../middlewares/authMiddleware');
const { checkPermission } = require('../../middlewares/permissionMiddleware');
const { PERMISSION_COLLECTION } = require('../../common/collection/permission.collection');

const createPermissionZodSchema = require('./zod/create-permission.zod');
const updatePermissionZodSchema = require('./zod/update-permission.zod');
const searchPermissionsZodSchema = require('./zod/search-permissions.zod');
const IdParamsSchema = require('../../common/zod/idParamsSchema.zod');

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/permissions
// Admin only: create a new system permission
// ─────────────────────────────────────────────────────────────────────────────
router.post(
  '/',
  authMiddleware,
  checkPermission(PERMISSION_COLLECTION.MANAGE_PERMISSIONS),
  validate(createPermissionZodSchema, 'body'),
  createPermission
);

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/permissions
// Admin only: list all permissions (paginated + searchable)
// ─────────────────────────────────────────────────────────────────────────────
router.get(
  '/',
  authMiddleware,
  checkPermission(PERMISSION_COLLECTION.READ_PERMISSIONS),
  validate(searchPermissionsZodSchema, 'query'),
  getPermissions
);

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/permissions/:id
// Admin only: get a single permission by ID
// ─────────────────────────────────────────────────────────────────────────────
router.get(
  '/:id',
  authMiddleware,
  checkPermission(PERMISSION_COLLECTION.READ_PERMISSIONS),
  validate(IdParamsSchema('id'), 'params'),
  getPermissionById
);

// ─────────────────────────────────────────────────────────────────────────────
// PATCH /api/permissions/:id
// Admin only: update name/description of a permission (code is immutable)
// ─────────────────────────────────────────────────────────────────────────────
router.patch(
  '/:id',
  authMiddleware,
  checkPermission(PERMISSION_COLLECTION.MANAGE_PERMISSIONS),
  validate(IdParamsSchema('id'), 'params'),
  validate(updatePermissionZodSchema, 'body'),
  updatePermission
);

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/permissions/:id
// Admin only: permanently delete a permission
// ─────────────────────────────────────────────────────────────────────────────
router.delete(
  '/:id',
  authMiddleware,
  checkPermission(PERMISSION_COLLECTION.MANAGE_PERMISSIONS),
  validate(IdParamsSchema('id'), 'params'),
  deletePermission
);

module.exports = router;
