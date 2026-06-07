const { z } = require("zod");
const mongoose = require("mongoose");

const getBooksQueryZodSchema = z.object({

  // 📄 Pagination
  page: z
    .string({
      invalid_type_error: "page must be a string",
    })
    .trim()
    .regex(/^\d+$/, {
      message: "page must be a valid positive number",
    })
    .transform((value) => Number(value))
    .refine((value) => value > 0, {
      message: "page must be greater than 0",
    })
    .optional(),

  limit: z
    .string({
      invalid_type_error: "limit must be a string",
    })
    .trim()
    .regex(/^\d+$/, {
      message: "limit must be a valid positive number",
    })
    .transform((value) => Number(value))
    .refine((value) => value > 0 && value <= 100, {
      message: "limit must be between 1 and 100",
    })
    .optional(),

  // 🔍 Search
  search: z
    .string({
      required_error: "search is required",
      invalid_type_error: "search must be a string",
    })
    .trim()
    .max(100, {
      message: "search cannot exceed 100 characters",
    })

    // Prevent regex abuse
    .refine(
      (value) => !/[.*+?^${}()|[\]\\]/.test(value),
      {
        message: "search contains invalid regex characters",
      }
    )

    // Clean extra spaces
    .transform((value) =>
      value.replace(/\s+/g, " ").trim()
    )
    .optional(),

  // 📚 Category
  category: z
    .string({
      invalid_type_error: "category must be a string",
    })
    .trim()
    .refine((value) => mongoose.Types.ObjectId.isValid(value), {
      message: "category must be a valid MongoDB ObjectId",
    })
    .optional(),

  // 💰 Price Filters
  minPrice: z
    .string({
      invalid_type_error: "minPrice must be a string",
    })
    .trim()
    .regex(/^\d+(\.\d+)?$/, {
      message: "minPrice must be a valid number",
    })
    .transform((value) => Number(value))
    .refine((value) => value >= 0, {
      message: "minPrice cannot be negative",
    })
    .optional(),

  maxPrice: z
    .string({
      invalid_type_error: "maxPrice must be a string",
    })
    .trim()
    .regex(/^\d+(\.\d+)?$/, {
      message: "maxPrice must be a valid number",
    })
    .transform((value) => Number(value))
    .refine((value) => value >= 0, {
      message: "maxPrice cannot be negative",
    })
    .optional(),

  // 🌍 Language
  language: z
    .string({
      invalid_type_error: "language must be a string",
    })
    .trim()
    .min(1, {
      message: "language cannot be empty",
    })
    .max(50, {
      message: "language cannot exceed 50 characters",
    })
    .optional(),

  // 📊 Status
  status: z
    .enum(
      ["draft", "published", "out_of_stock"],
      {
        invalid_type_error: "status must be a valid string",
      }
    )
    .optional(),

  // ⭐ Featured
  isFeatured: z
    .enum(["true", "false"], {
      invalid_type_error: "isFeatured must be true or false",
    })
    .transform((value) => value === "true")
    .optional(),

  // ⭐ Rating
  minRating: z
    .string({
      invalid_type_error: "minRating must be a string",
    })
    .trim()
    .regex(/^\d+(\.\d+)?$/, {
      message: "minRating must be a valid number",
    })
    .transform((value) => Number(value))
    .refine((value) => value >= 0 && value <= 5, {
      message: "minRating must be between 0 and 5",
    })
    .optional(),

  // 📦 Stock
  inStock: z
    .enum(["true", "false"], {
      invalid_type_error: "inStock must be true or false",
    })
    .transform((value) => value === "true")
    .optional(),

  // ↕️ Sorting
  sortBy: z
    .enum(
      [
        "createdAt",
        "price",
        "averageRating",
        "soldCount",
        "viewCount",
        "title",
      ],
      {
        invalid_type_error: "sortBy must be a valid string",
      }
    )
    .optional(),

  sortOrder: z
    .enum(["asc", "desc"], {
      invalid_type_error: "sortOrder must be asc or desc",
    })
    .optional(),

})
  .strict()

  // 💰 Cross Validation
  .refine(
    (data) => {
      if (
        data.minPrice !== undefined &&
        data.maxPrice !== undefined
      ) {
        return data.minPrice <= data.maxPrice;
      }

      return true;
    },
    {
      message: "minPrice cannot be greater than maxPrice",
      path: ["minPrice"],
    }
  );

module.exports = getBooksQueryZodSchema;