const { z } = require('zod');
const mongoose = require('mongoose');

const updateCategoryZodSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Category name must be a string',
    })
    .trim()
    .min(1, 'Category name cannot be empty')
    .max(100, 'Category name must be less than 100 characters')
    .optional(),

  description: z
    .string({
      invalid_type_error: 'Description must be a string',
    })
    .trim()
    .max(500, 'Description must be less than 500 characters')
    .optional(),

  file: z
    .string({
      invalid_type_error: 'File must be a string',
    })
    .optional(),

  image: z
    .string({
      invalid_type_error: 'Image must be a string URL',
    })
    .optional(),

  parent: z
    .string()
    .trim()
    .refine((value) => mongoose.Types.ObjectId.isValid(value), {
      message: 'Parent category must be a valid MongoDB ObjectId',
    })
    .optional()
    .nullable(),

  sortOrder: z.number().int().nonnegative().optional(),
  metaTitle: z.string().max(100).optional(),
  metaDescription: z.string().max(200).optional(),
  isActive: z.boolean().optional(),
}).strict();

module.exports = updateCategoryZodSchema;
