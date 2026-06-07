const { z } = require('zod');

const searchPermissionsZodSchema = z
  .object({
    page: z
      .string()
      .optional()
      .transform((v) => (v ? parseInt(v, 10) : 1))
      .pipe(z.number().int().positive('Page must be a positive integer')),

    limit: z
      .string()
      .optional()
      .transform((v) => (v ? parseInt(v, 10) : 10))
      .pipe(z.number().int().min(1).max(100, 'Limit must be at most 100')),

    search: z
      .string()
      .trim()
      .max(100)
      .optional(),

    sortBy: z
      .enum(['name', 'code', 'createdAt'], {
        invalid_type_error: 'sortBy must be one of: name, code, createdAt',
      })
      .optional()
      .default('createdAt'),

    sortOrder: z
      .enum(['asc', 'desc'], {
        invalid_type_error: 'sortOrder must be asc or desc',
      })
      .optional()
      .default('desc'),
  })
  .strict();

module.exports = searchPermissionsZodSchema;
