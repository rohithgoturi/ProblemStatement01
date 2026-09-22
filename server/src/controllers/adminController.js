const User = require('../models/User');

/**
 * GET /api/admin/users
 * Returns list of all registered users (passwords excluded).
 * Admin only.
 */
exports.listUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: 'User registry retrieved successfully',
      data: {
        total: users.length,
        users,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/admin/users/:userId/role
 * Allows an administrator to update another user's assigned role.
 * Admin only.
 */
exports.updateUserRole = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { role } = req.body || {};

    const validRoles = ['planner', 'site_supervisor', 'project_manager', 'admin'];
    if (!role || !validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: `Invalid role. Allowed roles are: ${validRoles.join(', ')}`,
        error: { code: 'INVALID_ROLE', validRoles },
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { role } },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'Target user not found',
        error: { code: 'USER_NOT_FOUND' },
      });
    }

    return res.status(200).json({
      success: true,
      message: `User role successfully updated to '${role}'`,
      data: {
        user: updatedUser,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/admin/stats
 * Aggregated administrative platform metrics.
 * Admin only.
 */
exports.getStats = async (req, res, next) => {
  try {
    const [totalUsers, plannerCount, supervisorCount, managerCount, adminCount] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: 'planner' }),
      User.countDocuments({ role: 'site_supervisor' }),
      User.countDocuments({ role: 'project_manager' }),
      User.countDocuments({ role: 'admin' }),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        totalUsers,
        roles: {
          planner: plannerCount,
          site_supervisor: supervisorCount,
          project_manager: managerCount,
          admin: adminCount,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};
