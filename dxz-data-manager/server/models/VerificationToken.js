const mongoose = require('mongoose');

/**
 * VerificationToken Schema for DXZ Data Manager
 * Handles email verification and password reset tokens
 */
const verificationTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
    index: true
  },
  token: {
    type: String,
    required: [true, 'Token is required'],
    unique: true,
    index: true
  },
  type: {
    type: String,
    required: [true, 'Token type is required'],
    enum: ['email_verification', 'password_reset'],
    default: 'email_verification'
  },
  expiresAt: {
    type: Date,
    required: [true, 'Expiration date is required'],
    default: function() {
      // Default expiration: 24 hours from now
      return new Date(Date.now() + 24 * 60 * 60 * 1000);
    }
  },
  used: {
    type: Boolean,
    default: false
  },
  usedAt: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for automatic cleanup of expired tokens
verificationTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Virtual to check if token is expired
verificationTokenSchema.virtual('isExpired').get(function() {
  return this.expiresAt < new Date();
});

// Virtual to check if token is valid
verificationTokenSchema.virtual('isValid').get(function() {
  return !this.used && !this.isExpired;
});

// Static method to find valid token
verificationTokenSchema.statics.findValidToken = function(token) {
  return this.findOne({
    token: token,
    used: false,
    expiresAt: { $gt: new Date() }
  }).populate('userId');
};

// Static method to cleanup expired tokens
verificationTokenSchema.statics.cleanupExpired = function() {
  return this.deleteMany({
    $or: [
      { expiresAt: { $lt: new Date() } },
      { used: true }
    ]
  });
};

// Method to mark token as used
verificationTokenSchema.methods.markAsUsed = function() {
  this.used = true;
  this.usedAt = new Date();
  return this.save();
};

// Static method to create verification token
verificationTokenSchema.statics.createToken = async function(userId, type = 'email_verification') {
  const { v4: uuidv4 } = require('uuid');
  
  // Delete any existing tokens for this user and type
  await this.deleteMany({ userId, type });
  
  // Create new token
  const token = uuidv4();
  
  const verificationToken = new this({
    userId,
    token,
    type,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
  });
  
  return verificationToken.save();
};

module.exports = mongoose.model('VerificationToken', verificationTokenSchema);