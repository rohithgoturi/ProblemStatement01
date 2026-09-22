const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'pragatipath_super_secure_jwt_secret_2026_sih';

/**
 * Middleware to authenticate requests using JWT Bearer tokens.
 * Verifies signature, expiration, and ensures user still exists in database.
 */
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required: missing or invalid authorization header',
        error: { code: 'UNAUTHORIZED' },
      });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required: token missing',
        error: { code: 'TOKEN_MISSING' },
      });
    }

    // Verify cryptographic signature
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (jwtErr) {
      const code = jwtErr.name === 'TokenExpiredError' ? 'TOKEN_EXPIRED' : 'INVALID_TOKEN';
      return res.status(401).json({
        success: false,
        message: `Session invalid: ${jwtErr.message}`,
        error: { code },
      });
    }

    // Fetch authoritative user from database
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User account associated with session no longer exists',
        error: { code: 'USER_NOT_FOUND' },
      });
    }

    // Attach verified user to request
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

/**
 * Middleware to enforce server-authoritative Role-Based Access Control (RBAC).
 * Compares user's actual database role against allowed roles for the endpoint.
 *
 * @param  {...string} allowedRoles Roles allowed to execute the route
 */
const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required prior to authorization check',
        error: { code: 'UNAUTHORIZED' },
      });
    }

    const userRole = req.user.role;
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: `Access denied: role '${userRole}' is not authorized to perform this action`,
        error: {
          code: 'FORBIDDEN',
          requiredRoles: allowedRoles,
          userRole,
        },
      });
    }

    next();
  };
};

module.exports = {
  authenticateToken,
  requireRole,
  JWT_SECRET,
};
