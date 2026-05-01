const { success } = require('zod');

exports.checkPermission = (...requiredPermissions) => {
  return (req, res, next) => {
    const userPermissions = req.user?.permissions || [];

    if (userPermissions.includes(process.env.ADMIN_PERMISSION)) {
      return next(); // bypass everything
    }

    const hasPermission = requiredPermissions.some((p) => userPermissions.includes(p));

    if (!hasPermission) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden',
        data: {},
      });
    }

    next();
  };
};
