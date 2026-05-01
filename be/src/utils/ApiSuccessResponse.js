const ApiSuccessResponse = (res, code, message, data) => {
  return res.status(code).json({
    success: true,
    message: message,
    data: data,
  });
};

const ApiPaginationSuccessResponse = (res, code, message, data, pagination) => {
  return res.status(code).json({
    success: true,
    message: message,
    data: data,
    pagination: pagination,
  });
};

module.exports = {
  ApiSuccessResponse,
  ApiPaginationSuccessResponse,
};
