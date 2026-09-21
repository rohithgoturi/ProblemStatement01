const crypto = require('crypto');
const User = require('../models/User');

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
 * POST /api/auth/signup
 * Register a new user
 */
exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Validation
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Name is required',
        error: { code: 'MISSING_FIELD' },
      });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Email is required',
        error: { code: 'MISSING_FIELD' },
      });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long',
        error: { code: 'INVALID_PASSWORD' },
      });
    }

    const validRoles = ['planner', 'site_supervisor', 'project_manager', 'admin'];
    const userRole = role && validRoles.includes(role) ? role : 'project_manager';

    // Check existing email
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists',
        error: { code: 'DUPLICATE_EMAIL' },
      });
    }

    // Hash password and save
    const { hash } = hashPassword(password);
    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hash,
      role: userRole,
    });

    await user.save();

    const token = `jwt_token_${user._id}_${Date.now()}`;

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
    next(error);
  }
};

/**
 * POST /api/auth/login
 * Log in an existing user
 */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !email.trim() || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
        error: { code: 'MISSING_FIELD' },
      });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
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
    next(error);
  }
};
