const { z } = require("zod");

const paginationZodSchema = z.object({
  page: z.preprocess(
    (val) => (val === undefined ? 1 : Number(val)),
    z
      .number({
        required_error: "Page is required",
        invalid_type_error: "Page must be a number",
      })
      .int("Page must be an integer")
      .min(1, "Page must be at least 1")
  ),

  limit: z.preprocess(
    (val) => (val === undefined ? 5 : Number(val)),
    z
      .number({
        required_error: "Limit is required",
        invalid_type_error: "Limit must be a number",
      })
      .int("Limit must be an integer")
      .min(1, "Limit must be at least 1")
      .max(100, "Limit cannot exceed 100")
  ),
});

module.exports = paginationZodSchema;