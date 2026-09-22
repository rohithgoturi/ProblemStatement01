const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { ensureDBConnected } = require('../config/db');
const { JWT_SECRET } = require('../middleware/authMiddleware');

/**
 * Hash password using Node crypto.pbkdf2
 */
function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return { salt, hash: `${salt}:${hash}` };
}

/**
 * Verify password against stored hash
 */
function verifyPassword(password, storedHash) {
  if (!storedHash || !storedHash.includes(':')) return false;
  const [salt, originalHash] = storedHash.split(':');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash === originalHash;
}

/**
 * Issue cryptographically signed JWT token
 */
function issueToken(user) {
  return jwt.sign(
    {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

/**
 * POST /api/auth/signup
 * Register a new user with secure password hashing and signed JWT issuance.
 */
exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, role, avatar } = req.body || {};

    // 1. Input Validation
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Name is required',
        error: { code: 'MISSING_FIELD', field: 'name' },
      });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Email is required',
        error: { code: 'MISSING_FIELD', field: 'email' },
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    if (!EMAIL_REGEX.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address',
        error: { code: 'INVALID_EMAIL', field: 'email' },
      });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long',
        error: { code: 'INVALID_PASSWORD', field: 'password' },
      });
    }

    const validRoles = ['planner', 'site_supervisor', 'project_manager', 'admin'];
    const userRole = role && validRoles.includes(role) ? role : 'project_manager';

    // 2. Ensure Database Availability
    const isConnected = await ensureDBConnected(3000);
    if (!isConnected) {
      return res.status(503).json({
        success: false,
        message: 'Database service is temporarily unavailable. Please try again shortly.',
        error: { code: 'SERVICE_UNAVAILABLE' },
      });
    }

    // 3. Duplicate Email Check (returns 409 Conflict)
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email address already exists',
        error: { code: 'DUPLICATE_EMAIL' },
      });
    }

    // 4. Hash password securely & persist user
    const { hash } = hashPassword(password);
    const user = new User({
      name: name.trim(),
      email: normalizedEmail,
      password: hash,
      role: userRole,
      avatar: avatar && typeof avatar === 'string' ? avatar.trim() : null,
    });

    await user.save();

    // 5. Generate cryptographically signed JWT token
    const token = issueToken(user);

    // 6. Return response (passwords are strictly omitted)
    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        },
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email address already exists',
        error: { code: 'DUPLICATE_EMAIL' },
      });
    }

    if (error.name === 'ValidationError') {
      const firstMessage = Object.values(error.errors || {})[0]?.message || 'Validation failed';
      return res.status(400).json({
        success: false,
        message: firstMessage,
        error: { code: 'VALIDATION_ERROR' },
      });
    }

    if (error.name === 'MongooseError' && error.message.includes('buffering timed out')) {
      return res.status(503).json({
        success: false,
        message: 'Database operation timed out. Please try again shortly.',
        error: { code: 'DATABASE_TIMEOUT' },
      });
    }

    next(error);
  }
};

/**
 * POST /api/auth/login
 * Authenticate user credentials and return signed JWT token.
 */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !email.trim() || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
        error: { code: 'MISSING_FIELD' },
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Ensure Database Availability
    const isConnected = await ensureDBConnected(3000);
    if (!isConnected) {
      return res.status(503).json({
        success: false,
        message: 'Database service is temporarily unavailable. Please try again shortly.',
        error: { code: 'SERVICE_UNAVAILABLE' },
      });
    }

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
        error: { code: 'INVALID_CREDENTIALS' },
      });
    }

    const isMatch = verifyPassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
        error: { code: 'INVALID_CREDENTIALS' },
      });
    }

    const token = issueToken(user);

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        },
      },
    });
  } catch (error) {
    if (error.name === 'MongooseError' && error.message.includes('buffering timed out')) {
      return res.status(503).json({
        success: false,
        message: 'Database operation timed out. Please try again shortly.',
        error: { code: 'DATABASE_TIMEOUT' },
      });
    }
    next(error);
  }
};

/**
 * GET /api/auth/me
 * Returns the currently authenticated user's profile from database.
 */
exports.getMe = async (req, res) => {
  const user = req.user;
  return res.status(200).json({
    success: true,
    message: 'Current authenticated user profile retrieved',
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        createdAt: user.createdAt,
      },
    },
  });
};

/**
 * PUT /api/auth/profile
 * Update user's profile information (name, avatar).
 * STRICT SECURITY: Rejects any attempt by the user to modify their own role.
 */
exports.updateProfile = async (req, res, next) => {
  try {
    const { name, avatar, role } = req.body || {};

    // Prevent self-role elevation
    if (role && role !== req.user.role) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You cannot change your own role. Roles must be assigned by a system administrator.',
        error: { code: 'ROLE_MODIFICATION_FORBIDDEN' },
      });
    }

    const updateFields = {};
    if (name && name.trim()) {
      updateFields.name = name.trim();
    }
    if (avatar !== undefined) {
      updateFields.avatar = avatar ? avatar.trim() : null;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).select('-password');

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: {
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
          avatar: updatedUser.avatar,
          updatedAt: updatedUser.updatedAt,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/auth/change-password
 * Allows authenticated user to change their password after verifying their current password.
 */
exports.changePassword = async (req, res, next) => {
  try {
    const currentPassword = req.body?.currentPassword || req.body?.oldPassword;
    const newPassword = req.body?.newPassword;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required',
        error: { code: 'MISSING_FIELD' },
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long',
        error: { code: 'INVALID_PASSWORD' },
      });
    }

    // Load full user with password
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User account not found',
        error: { code: 'USER_NOT_FOUND' },
      });
    }

    const isMatch = verifyPassword(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password does not match records',
        error: { code: 'INVALID_CREDENTIALS' },
      });
    }

    const { hash } = hashPassword(newPassword);
    user.password = hash;
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Password updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/team
 * Returns the sanitized list of registered project team members.
 * Requires authentication.
 */
exports.getTeam = async (req, res, next) => {
  try {
    const users = await User.find()
      .select('name email role avatar createdAt')
      .sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      message: 'Project team members retrieved successfully',
      data: {
        total: users.length,
        members: users,
      },
    });
  } catch (error) {
    next(error);
  }
};

