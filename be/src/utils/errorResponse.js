const sendError = (res, statusCode, message, errors = []) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};

// 🔹 400 - Bad Request
const BadRequestException = (res, message = "Bad Request", errors = []) => {
  return sendError(res, 400, message, errors);
};

// 🔹 401 - Unauthorized
const UnauthorizedException = (res, message = "Unauthorized") => {
  return sendError(res, 401, message);
};

// 🔹 404 - Not Found
const NotFoundException = (res, message = "Not Found") => {
  return sendError(res, 404, message);
};

// 🔹 500 - Internal Server Error
const InternalServerError = (res, message = "Internal Server Error") => {
  return sendError(res, 500, message);
};

module.exports = {
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
  InternalServerError,
};