const validate = (schema) => async (req, res, next) => {
  try {
    const result = await schema.parseAsync(req.body);

    req.body = result;
    next();

  } catch (err) {
    if (err.name === "ZodError") {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: err.issues.map((e) => ({
          field: e.path?.[0] || "unknown",
          message: e.message,
        })),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Validation Error",
      errors: [],
    });
  }
};

module.exports = validate;