const { body, param, query, validationResult } = require('express-validator');

/**
 * Validation Middleware for DXZ Data Manager
 * Provides input validation and sanitization
 */

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => ({
      field: error.path,
      message: error.msg,
      value: error.value
    }));

    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errorMessages
    });
  }
  
  next();
};

// User registration validation
const validateUserRegistration = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores')
    .escape(),
  
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail()
    .isLength({ max: 100 })
    .withMessage('Email must be less than 100 characters'),
  
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  handleValidationErrors
];

// User login validation
const validateUserLogin = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  
  handleValidationErrors
];

// Forgot password validation
const validateForgotPassword = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  handleValidationErrors
];

// Reset password validation
const validateResetPassword = [
  body('token')
    .notEmpty()
    .withMessage('Reset token is required')
    .isUUID()
    .withMessage('Invalid reset token format'),
  
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  handleValidationErrors
];

// User data validation
const validateUserData = [
  body('uid')
    .trim()
    .matches(/^61\d+$/)
    .withMessage('UID must start with "61" and contain only numbers')
    .isLength({ min: 3, max: 50 })
    .withMessage('UID must be between 3 and 50 characters'),
  
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ max: 200 })
    .withMessage('Password must be less than 200 characters')
    .escape(),
  
  body('twoFaKey')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('2FA key must be less than 100 characters')
    .escape(),
  
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail()
    .isLength({ max: 100 })
    .withMessage('Email must be less than 100 characters'),
  
  body('date')
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage('Date must be in YYYY-MM-DD format')
    .isISO8601()
    .withMessage('Please provide a valid date'),
  
  handleValidationErrors
];

// Facebook URL/UID validation
const validateFacebookUID = [
  body('input')
    .trim()
    .notEmpty()
    .withMessage('Facebook URL or UID is required')
    .custom((value) => {
      // Check if it's a direct UID (starts with 61)
      if (/^61\d+$/.test(value)) {
        return true;
      }
      
      // Check if it's a Facebook URL with UID
      if (value.includes('facebook.com') && /(?:id=|profile\.php\?id=)(\d+)/.test(value)) {
        return true;
      }
      
      throw new Error('Invalid Facebook URL or UID format');
    }),
  
  handleValidationErrors
];

// Name generation validation
const validateNameGeneration = [
  param('gender')
    .trim()
    .toLowerCase()
    .isIn(['male', 'female'])
    .withMessage('Gender must be either "male" or "female"'),
  
  query('count')
    .optional()
    .isInt({ min: 1, max: 20 })
    .withMessage('Count must be between 1 and 20')
    .toInt(),
  
  handleValidationErrors
];

// Date parameter validation
const validateDateParam = [
  param('date')
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage('Date must be in YYYY-MM-DD format')
    .isISO8601()
    .withMessage('Please provide a valid date'),
  
  handleValidationErrors
];

// MongoDB ObjectId validation
const validateObjectId = (paramName) => [
  param(paramName)
    .isMongoId()
    .withMessage(`Invalid ${paramName} format`),
  
  handleValidationErrors
];

// File download validation
const validateFileDownload = [
  query('format')
    .optional()
    .isIn(['txt', 'xlsx'])
    .withMessage('Format must be either "txt" or "xlsx"'),
  
  query('date')
    .optional()
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage('Date must be in YYYY-MM-DD format')
    .isISO8601()
    .withMessage('Please provide a valid date'),
  
  handleValidationErrors
];

// Sanitize HTML to prevent XSS
const sanitizeInput = (req, res, next) => {
  // Additional sanitization can be added here
  // The express-validator escape() function already handles basic HTML escaping
  next();
};

module.exports = {
  handleValidationErrors,
  validateUserRegistration,
  validateUserLogin,
  validateForgotPassword,
  validateResetPassword,
  validateUserData,
  validateFacebookUID,
  validateNameGeneration,
  validateDateParam,
  validateObjectId,
  validateFileDownload,
  sanitizeInput
};