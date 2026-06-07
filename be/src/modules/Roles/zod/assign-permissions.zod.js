const { z } = require('zod');
const mongoose = require('mongoose');

// Shared: non-empty array of valid ObjectId strings
const permissionIdsArray = z
  .array(
    z
      .string({ invalid_type_error: 'Each permission ID must be a string' })
      .trim()
      .refine((v) => mongoose.Types.ObjectId.isValid(v), {
        message: 'Each permission ID must be a valid MongoDB ObjectId',
      })
  )
  .min(1, 'At least one permission ID is required')
  .max(200, 'Cannot assign more than 200 permissions at once');

// ─── Add permissions to a role ───────────────────────────────────────────────
const addPermissionsToRoleZodSchema = z
  .object({
    permissionIds: permissionIdsArray,
  })
  .strict();

// ─── Remove permissions from a role ─────────────────────────────────────────
const removePermissionsFromRoleZodSchema = z
  .object({
    permissionIds: permissionIdsArray,
  })
  .strict();

// ─── Set (replace all) permissions on a role ────────────────────────────────
const setPermissionsOnRoleZodSchema = z
  .object({
    permissionIds: z
      .array(
        z
          .string({ invalid_type_error: 'Each permission ID must be a string' })
          .trim()
          .refine((v) => mongoose.Types.ObjectId.isValid(v), {
            message: 'Each permission ID must be a valid MongoDB ObjectId',
          })
      )
      .max(200, 'Cannot set more than 200 permissions at once'),
  })
  .strict();

module.exports = {
  addPermissionsToRoleZodSchema,
  removePermissionsFromRoleZodSchema,
  setPermissionsOnRoleZodSchema,
};
