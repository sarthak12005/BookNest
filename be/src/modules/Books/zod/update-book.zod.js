const { z } = require('zod');

const updateBookZodSchema = z
  .object({
    title: z
      .string({
        invalid_type_error: 'Title must be a string',
      })
      .trim()
      .min(1, 'Title cannot be empty')
      .optional(),

    author: z
      .string({
        invalid_type_error: 'Author must be a string',
      })
      .trim()
      .min(1, 'Author cannot be empty')
      .optional(),

    description: z
      .string({
        invalid_type_error: 'Description must be a string',
      })
      .trim()
      .min(10, 'Description must be at least 10 characters long')
      .optional(),

    shortDescription: z
      .string({
        invalid_type_error: 'Short description must be a string',
      })
      .trim()
      .optional(),

    isbn: z
      .string({
        invalid_type_error: 'ISBN must be a string',
      })
      .trim()
      .min(10, 'ISBN must be at least 10 characters long')
      .optional(),

    publisher: z
      .string({
        invalid_type_error: 'Publisher must be a string',
      })
      .trim()
      .optional(),

    publicationDate: z
      .string({
        invalid_type_error: 'Publication date must be a string',
      })
      .optional(),

    language: z
      .string({
        invalid_type_error: 'Language must be a string',
      })
      .trim()
      .min(1, 'Language cannot be empty')
      .optional(),

    category: z
      .string({
        invalid_type_error: 'Category must be a string',
      })
      .regex(/^[0-9a-fA-F]{24}$/, {
        message: 'Category must be a valid MongoDB ObjectId',
      })
      .optional(),

    tags: z
      .array(
        z.string({
          invalid_type_error: 'Each tag must be a string',
        })
      )
      .optional(),

    price: z
      .number({
        invalid_type_error: 'Price must be a number',
      })
      .positive('Price must be greater than 0')
      .optional(),

    discountPrice: z
      .number({
        invalid_type_error: 'Discount price must be a number',
      })
      .min(0, 'Discount price cannot be negative')
      .optional(),

    currency: z
      .string({
        invalid_type_error: 'Currency must be a string',
      })
      .optional(),

    stock: z
      .number({
        invalid_type_error: 'Stock must be a number',
      })
      .min(0, 'Stock cannot be negative')
      .optional(),

    coverImages: z
      .array(
        z
          .string({
            invalid_type_error: 'Cover image URL must be a string',
          })
          .url('Each cover image must be a valid URL')
      )
      .min(1, 'At least one cover image is required')
      .optional(),

    pdfUrl: z
      .string({
        invalid_type_error: 'PDF URL must be a string',
      })
      .url('PDF URL must be a valid URL')
      .optional(),

    status: z
      .enum(['published', 'draft', 'out_of_stock'], {
        invalid_type_error: 'Status must be published, draft, or out_of_stock',
      })
      .optional(),

    isFeatured: z
      .boolean({
        invalid_type_error: 'isFeatured must be a boolean',
      })
      .optional(),

    searchKeywords: z
      .array(
        z
          .string({
            invalid_type_error: 'Each search keyword must be a string',
          })
          .trim()
          .min(1, 'Search keyword cannot be empty')
      )
      .optional(),
  })
  .strict();

module.exports = updateBookZodSchema;
