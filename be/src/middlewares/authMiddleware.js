const jwt = require("jsonwebtoken");
const User = require("../modules/Users/schema/users.schema");
const Role = require('../modules/Roles/schemas/roles.schema');
const Permission = require('../modules/Permissions/schemas/permissions.schema')

exports.authMiddleware = async (req, res, next) => {
  try {
    let token;

    // ✅ 1. Get token from cookie (PRIMARY)
    if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    // ✅ 2. Fallback: Authorization header
    else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // ❌ No token
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - No token provided",
      });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Check user exists
    const user = await User.findById(decoded.userId)
      .select("_id name email roleIds")
      .populate({
        path: "role",
        select: "_id code name permissions",
        populate: {
          path: "permissions",
          select: "_id code name",
        },
      })

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized - User not found",
      });
    }

    const permissions = new Set();

    if (user.role && user.role.permissions) {
      user.role.permissions.forEach(p => {
        permissions.add(p.code);
      });
    }

    // ✅ Attach only what we need
    req.user = {
      userId: user._id,
      permissions: Array.from(permissions),
    };

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};