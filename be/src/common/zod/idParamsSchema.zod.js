const { z } = require("zod");
const mongoose = require("mongoose");

const IdParamsSchema = (
  fieldName = "id"
) => {

  return z.object({

    [fieldName]: z
      .string({
        required_error: `${fieldName} is required`,
        invalid_type_error: `${fieldName} must be a string`,
      })
      .trim()
      .refine(
        (value) =>
          mongoose.Types.ObjectId.isValid(value),
        {
          message: `${fieldName} must be a valid MongoDB ObjectId`,
        }
      ),

  }).strict();

};

module.exports = IdParamsSchema;