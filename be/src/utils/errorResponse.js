const sendError = (res, statusCode, message, errors = []) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};

const throwSendError = (statusCode, message, errors = []) => {
  throw {
    statusCode: statusCode,
    message: message,
    errors: errors
  };
}

// 🔹 400 - Bad Request
const BadRequestException = (res, message = "Bad Request", errors = []) => {
  return sendError(res, 400, message, errors);
};

const throwBadRequestException = (message="Bad Request", errors=[]) => {
    throwSendError(400, message, errors);
}

// 🔹 401 - Unauthorized
const throwUnauthorizedException = (message = "Unauthorized", errors=[]) => {
  return throwSendError(401, message, errors);
};

// 🔹 404 - Not Found
const NotFoundException = (res, message = "Not Found") => {
  return sendError(res, 404, message);
};

// 🔹 500 - Internal Server Error
const throwInternalServerError = (message = "Internal Server Error", errors = []) => {
  return throwSendError(500, message, errors);
};


module.exports = {
  BadRequestException,
  throwUnauthorizedException,
  NotFoundException,
  throwInternalServerError,
  throwBadRequestException
};