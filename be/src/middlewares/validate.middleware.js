const validate =
  (schema, source = 'body') =>
  async (req, res, next) => {
    try {
      const data = req[source];

      const result = await schema.parseAsync(data);

      req[source] = result;
      next();
    } catch (err) {
      if (err.name === 'ZodError') {
        return res.status(400).json({
          success: false,
          message: 'Validation Error',
          errors: err.issues.map((e) => ({
            field: e.path?.[0] || 'unknown',
            message: e.message,
          })),
        });
      }

      return res.status(500).json({
        success: false,
        message: 'Internal Validation Error',
        errors: [],
      });
    }
  };

module.exports = validate;
