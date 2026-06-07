const express = require('express');
const router = express.Router();

const {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  addPermissionsToRole,
  removePermissionsFromRole,
  setPermissionsOnRole,
  assignRoleToUser,
  softDeleteRole,
} = require('./roles.controller');

const validate = require('../../middlewares/validate.middleware');
const { authMiddleware } = require('../../middlewares/authMiddleware');
const { checkPermission } = require('../../middlewares/permissionMiddleware');
const { PERMISSION_COLLECTION } = require('../../common/collection/permission.collection');

const createRoleZodSchema = require('./zod/create-role.zod');
const updateRoleZodSchema = require('./zod/update-role.zod');
const searchRolesZodSchema = require('./zod/search-roles.zod');
const assignRoleToUserZodSchema = require('./zod/assign-role-to-user.zod');
const {
  addPermissionsToRoleZodSchema,
  removePermissionsFromRoleZodSchema,
  setPermissionsOnRoleZodSchema,
} = require('./zod/assign-permissions.zod');
const IdParamsSchema = require('../../common/zod/idParamsSchema.zod');

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/roles
// Create a new role (admin only)
// ─────────────────────────────────────────────────────────────────────────────
router.post(
  '/',
  authMiddleware,
  checkPermission(PERMISSION_COLLECTION.MANAGE_ROLES),
  validate(createRoleZodSchema, 'body'),
  createRole
);

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/roles
// List all roles — paginated, searchable, filterable by isActive
// ─────────────────────────────────────────────────────────────────────────────
router.get(
  '/',
  authMiddleware,
  checkPermission(PERMISSION_COLLECTION.READ_ROLES),
  validate(searchRolesZodSchema, 'query'),
  getRoles
);

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/roles/:id
// Get a single role with its permissions populated
// ─────────────────────────────────────────────────────────────────────────────
router.get(
  '/:id',
  authMiddleware,
  checkPermission(PERMISSION_COLLECTION.READ_ROLES),
  validate(IdParamsSchema('id'), 'params'),
  getRoleById
);

// ─────────────────────────────────────────────────────────────────────────────
// PATCH /api/roles/:id
// Update role name and/or isActive status (code is immutable)
// ─────────────────────────────────────────────────────────────────────────────
router.patch(
  '/:id',
  authMiddleware,
  checkPermission(PERMISSION_COLLECTION.MANAGE_ROLES),
  validate(IdParamsSchema('id'), 'params'),
  validate(updateRoleZodSchema, 'body'),
  updateRole
);

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/roles/:id/permissions/add
// Add one or more permissions to a role (no duplicates via $addToSet)
// ─────────────────────────────────────────────────────────────────────────────
router.post(
  '/:id/permissions/add',
  authMiddleware,
  checkPermission(PERMISSION_COLLECTION.MANAGE_ROLES),
  validate(IdParamsSchema('id'), 'params'),
  validate(addPermissionsToRoleZodSchema, 'body'),
  addPermissionsToRole
);

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/roles/:id/permissions/remove
// Remove one or more permissions from a role
// ─────────────────────────────────────────────────────────────────────────────
router.post(
  '/:id/permissions/remove',
  authMiddleware,
  checkPermission(PERMISSION_COLLECTION.MANAGE_ROLES),
  validate(IdParamsSchema('id'), 'params'),
  validate(removePermissionsFromRoleZodSchema, 'body'),
  removePermissionsFromRole
);

// ─────────────────────────────────────────────────────────────────────────────
// PUT /api/roles/:id/permissions
// Replace ALL permissions on a role (full set replace)
// ─────────────────────────────────────────────────────────────────────────────
router.put(
  '/:id/permissions',
  authMiddleware,
  checkPermission(PERMISSION_COLLECTION.MANAGE_ROLES),
  validate(IdParamsSchema('id'), 'params'),
  validate(setPermissionsOnRoleZodSchema, 'body'),
  setPermissionsOnRole
);

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/roles/assign-to-user
// Assign a role to a specific user (admin only)
// NOTE: This route must be registered BEFORE /:id routes to avoid conflicts
// ─────────────────────────────────────────────────────────────────────────────
router.post(
  '/assign-to-user',
  authMiddleware,
  checkPermission(PERMISSION_COLLECTION.MANAGE_ROLES),
  validate(assignRoleToUserZodSchema, 'body'),
  assignRoleToUser
);

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/roles/:id
// Soft delete — sets isActive = false (role data preserved)
// ─────────────────────────────────────────────────────────────────────────────
router.delete(
  '/:id',
  authMiddleware,
  checkPermission(PERMISSION_COLLECTION.MANAGE_ROLES),
  validate(IdParamsSchema('id'), 'params'),
  softDeleteRole
);

module.exports = router;
