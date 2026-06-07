const { z } = require('zod');
const mongoose = require('mongoose');

const createRoleZodSchema = z
  .object({
    name: z
      .string({
        required_error: 'Role name is required',
        invalid_type_error: 'Role name must be a string',
      })
      .trim()
      .min(2, 'Role name must be at least 2 characters')
      .max(80, 'Role name must be at most 80 characters'),

    code: z
      .string({
        required_error: 'Role code is required',
        invalid_type_error: 'Role code must be a string',
      })
      .trim()
      .toUpperCase()
      .min(2, 'Role code must be at least 2 characters')
      .max(80, 'Role code must be at most 80 characters')
      .regex(
        /^[A-Z0-9_]+$/,
        'Role code must contain only uppercase letters, digits, and underscores (e.g. STORE_MANAGER)'
      ),

    permissions: z
      .array(
        z
          .string({ invalid_type_error: 'Each permission must be a valid MongoDB ObjectId string' })
          .trim()
          .refine((v) => mongoose.Types.ObjectId.isValid(v), {
            message: 'Each permission must be a valid MongoDB ObjectId',
          })
      )
      .min(0)
      .max(200, 'A role can have at most 200 permissions')
      .optional()
      .default([]),

    isActive: z.boolean().optional().default(true),
  })
  .strict();

module.exports = createRoleZodSchema;
