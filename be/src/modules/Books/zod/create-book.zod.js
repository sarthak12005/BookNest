const { z } = require('zod');

const createBookZodSchema = z
  .object({
    title: z
      .string({
        required_error: 'Title is required',
        invalid_type_error: 'Title must be a string',
      })
      .trim()
      .min(1, 'Title cannot be empty'),

    author: z
      .string({
        required_error: 'Author is required',
        invalid_type_error: 'Author must be a string',
      })
      .trim()
      .min(1, 'Author cannot be empty'),

    description: z
      .string({
        required_error: 'Description is required',
        invalid_type_error: 'Description must be a string',
      })
      .trim()
      .min(10, 'Description must be at least 10 characters long'),

    shortDescription: z
      .string({
        invalid_type_error: 'Short description must be a string',
      })
      .trim()
      .optional(),

    isbn: z
      .string({
        required_error: 'ISBN is required',
        invalid_type_error: 'ISBN must be a string',
      })
      .trim()
      .min(10, 'ISBN must be at least 10 characters long'),

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
        required_error: 'Language is required',
        invalid_type_error: 'Language must be a string',
      })
      .trim()
      .min(1, 'Language cannot be empty'),

    category: z
      .string({
        required_error: 'Category is required',
        invalid_type_error: 'Category must be a string',
      })
      .regex(/^[0-9a-fA-F]{24}$/, {
        message: 'Category must be a valid MongoDB ObjectId',
      }),

    tags: z
      .array(
        z.string({
          invalid_type_error: 'Each tag must be a string',
        })
      )
      .optional(),

    price: z
      .number({
        required_error: 'Price is required',
        invalid_type_error: 'Price must be a number',
      })
      .positive('Price must be greater than 0'),

    discountPrice: z
      .number({
        required_error: 'Discount price is required',
        invalid_type_error: 'Discount price must be a number',
      })
      .min(0, 'Discount price cannot be negative'),

    currency: z
      .string({
        invalid_type_error: 'Currency must be a string',
      })
      .default('INR')
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
          .url('Each cover image must be a valid URL'),
        {
          required_error: 'Cover images are required',
          invalid_type_error: 'Cover images must be an array',
        }
      )
      .min(1, 'At least one cover image is required'),

    pdfUrl: z
      .string({
        required_error: 'PDF URL is required',
        invalid_type_error: 'PDF URL must be a string',
      })
      .url('PDF URL must be a valid URL'),

    status: z
      .enum(['published', 'draft'], {
        invalid_type_error: 'Status must be either published or draft',
      })
      .default('published')
      .optional(),

    isFeatured: z
      .boolean({
        invalid_type_error: 'isFeatured must be a boolean',
      })
      .default(false)
      .optional(),

    searchKeywords: z
      .array(
        z
          .string({
            invalid_type_error: 'Each search keyword must be a string',
          })
          .trim()
          .min(1, 'Search keyword cannot be empty'),
        {
          invalid_type_error: 'Search keywords must be an array',
        }
      )
      .optional(),
  })
  .strict();

module.exports = createBookZodSchema;
