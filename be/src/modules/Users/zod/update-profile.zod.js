const { z } = require('zod');

const updateProfileSchema = z
  .object({
    fullName: z
      .string({
        invalid_type_error: 'Full name must be a string',
      })
      .min(3, 'Full name must be at least 3 characters')
      .max(50, 'Full name cannot exceed 50 characters')
      .optional(),
    username: z
      .string({
        invalid_type_error: 'Username must be a string',
      })
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username cannot exceed 20 characters')
      .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain alphanumeric characters and underscores')
      .optional(),
    profilePic: z
      .string({
        invalid_type_error: 'Profile picture must be a string',
      })
      .optional()
      .nullable(),
    bio: z
      .string({
        invalid_type_error: 'Bio must be a string',
      })
      .max(200, 'Bio cannot exceed 200 characters')
      .optional()
      .nullable(),
  })
  .strict();

module.exports = updateProfileSchema;
