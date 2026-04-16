const ApiSuccessResponse = (res, code, message, data) => {
    return res.status(code).json({
        success: true,
        message: message,
        data: data
    });
}

module.exports = ApiSuccessResponse;