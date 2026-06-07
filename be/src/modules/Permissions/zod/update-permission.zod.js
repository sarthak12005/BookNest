const { z } = require('zod');

const updatePermissionZodSchema = z
  .object({
    name: z
      .string({
        invalid_type_error: 'Permission name must be a string',
      })
      .trim()
      .min(2, 'Permission name must be at least 2 characters')
      .max(100, 'Permission name must be at most 100 characters')
      .optional(),

    description: z
      .string({
        invalid_type_error: 'Description must be a string',
      })
      .trim()
      .max(300, 'Description must be at most 300 characters')
      .optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field (name or description) must be provided for update',
  });

module.exports = updatePermissionZodSchema;
