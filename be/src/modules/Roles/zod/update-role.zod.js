const { z } = require('zod');

const updateRoleZodSchema = z
  .object({
    name: z
      .string({ invalid_type_error: 'Role name must be a string' })
      .trim()
      .min(2, 'Role name must be at least 2 characters')
      .max(80, 'Role name must be at most 80 characters')
      .optional(),

    isActive: z.boolean({ invalid_type_error: 'isActive must be a boolean' }).optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field (name or isActive) must be provided',
  });

module.exports = updateRoleZodSchema;
