const { z } = require('zod');

const createPermissionZodSchema = z
  .object({
    name: z
      .string({
        required_error: 'Permission name is required',
        invalid_type_error: 'Permission name must be a string',
      })
      .trim()
      .min(2, 'Permission name must be at least 2 characters')
      .max(100, 'Permission name must be at most 100 characters'),

    code: z
      .string({
        required_error: 'Permission code is required',
        invalid_type_error: 'Permission code must be a string',
      })
      .trim()
      .toUpperCase()
      .min(2, 'Permission code must be at least 2 characters')
      .max(100, 'Permission code must be at most 100 characters')
      .regex(
        /^[A-Z0-9_]+$/,
        'Permission code must contain only uppercase letters, digits, and underscores (e.g. READ_BOOKS)'
      ),

    description: z
      .string({
        invalid_type_error: 'Description must be a string',
      })
      .trim()
      .max(300, 'Description must be at most 300 characters')
      .optional(),
  })
  .strict();

module.exports = createPermissionZodSchema;
