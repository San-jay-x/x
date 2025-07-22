const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Authentication Middleware for DXZ Data Manager
 * Verifies JWT tokens and protects routes
 */

// JWT Secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'dxz-data-manager-secret-key-change-in-production';

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign(
    { userId: userId.toString() },
    JWT_SECRET,
    { 
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
      issuer: 'dxz-data-manager',
      audience: 'dxz-users'
    }
  );
};

// Verify JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET, {
      issuer: 'dxz-data-manager',
      audience: 'dxz-users'
    });
  } catch (error) {
    throw new Error('Invalid token');
  }
};

// Authentication middleware
const authenticateToken = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token required'
      });
    }

    // Verify token
    const decoded = verifyToken(token);
    
    // Find user
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if user is verified
    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message: 'Please verify your email address'
      });
    }

    // Check if account is locked
    if (user.isLocked) {
      return res.status(423).json({
        success: false,
        message: 'Account is temporarily locked due to too many failed login attempts'
      });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Authentication failed'
    });
  }
};

// Optional authentication middleware (doesn't require authentication)
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const decoded = verifyToken(token);
      const user = await User.findById(decoded.userId).select('-password');
      if (user && user.isVerified && !user.isLocked) {
        req.user = user;
      }
    }
    
    next();
  } catch (error) {
    // Silent fail for optional auth
    next();
  }
};

// Admin middleware (for future admin features)
const requireAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({
      success: false,
      message: 'Admin access required'
    });
  }
  next();
};

// Rate limiting for sensitive operations
const sensitiveOperationLimit = (req, res, next) => {
  // This would integrate with Redis or a similar store for production
  // For now, we'll use the existing rate limiting from express-rate-limit
  next();
};

module.exports = {
  generateToken,
  verifyToken,
  authenticateToken,
  optionalAuth,
  requireAdmin,
  sensitiveOperationLimit
};