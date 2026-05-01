const { z } = require('zod');
const paginationZodSchema = require('../../../common/zod/pagination.zod');

const searchingCategoryZodSchema = paginationZodSchema.merge(
  z.object({
    name: z
      .string({
        invalid_type_error: 'name must be a string',
      })
      .min(1, 'name must be at least 1 characters')
      .optional(),
  })
);

module.exports = searchingCategoryZodSchema;
