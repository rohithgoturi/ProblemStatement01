const crypto = require('crypto');
const User = require('../models/User');
const { ensureDBConnected } = require('../config/db');

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

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

/**
 * POST /api/auth/signup
 * Register a new user
 */
exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body || {};

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
    });

    await user.save();

    // 5. Generate session token
    const token = `jwt_token_${user._id}_${Date.now()}`;

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
        },
      },
    });
  } catch (error) {
    // Handle MongoDB unique index duplicate key collision
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email address already exists',
        error: { code: 'DUPLICATE_EMAIL' },
      });
    }

    // Handle Mongoose schema validation failure
    if (error.name === 'ValidationError') {
      const firstMessage = Object.values(error.errors || {})[0]?.message || 'Validation failed';
      return res.status(400).json({
        success: false,
        message: firstMessage,
        error: { code: 'VALIDATION_ERROR' },
      });
    }

    // Handle Mongoose buffering timeout
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
 * Log in an existing user
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

    const token = `jwt_token_${user._id}_${Date.now()}`;

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
