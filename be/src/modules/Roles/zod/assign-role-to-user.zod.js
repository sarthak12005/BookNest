const { z } = require('zod');
const mongoose = require('mongoose');

const assignRoleToUserZodSchema = z
  .object({
    userId: z
      .string({
        required_error: 'userId is required',
        invalid_type_error: 'userId must be a string',
      })
      .trim()
      .refine((v) => mongoose.Types.ObjectId.isValid(v), {
        message: 'userId must be a valid MongoDB ObjectId',
      }),

    roleId: z
      .string({
        required_error: 'roleId is required',
        invalid_type_error: 'roleId must be a string',
      })
      .trim()
      .refine((v) => mongoose.Types.ObjectId.isValid(v), {
        message: 'roleId must be a valid MongoDB ObjectId',
      }),
  })
  .strict();

module.exports = assignRoleToUserZodSchema;
