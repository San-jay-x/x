const mongoose = require('mongoose');

/**
 * UserData Schema for DXZ Data Manager
 * Stores user-specific data entries (UID, passwords, 2FA keys, emails)
 */
const userDataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
    index: true
  },
  uid: {
    type: String,
    required: [true, 'UID is required'],
    validate: {
      validator: function(v) {
        // UID should start with "61" and be numeric
        return /^61\d+$/.test(v);
      },
      message: 'UID must start with "61" and contain only numbers'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    trim: true
  },
  twoFaKey: {
    type: String,
    default: '',
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
  },
  date: {
    type: String,
    required: [true, 'Date is required'],
    match: [/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient queries
userDataSchema.index({ userId: 1, date: -1 });
userDataSchema.index({ userId: 1, createdAt: -1 });
userDataSchema.index({ date: -1 });

// Static method to get user data grouped by date
userDataSchema.statics.getGroupedByDate = async function(userId) {
  return this.aggregate([
    { $match: { userId: mongoose.Types.ObjectId(userId) } },
    { 
      $group: {
        _id: '$date',
        entries: { 
          $push: {
            _id: '$_id',
            uid: '$uid',
            password: '$password',
            twoFaKey: '$twoFaKey',
            email: '$email',
            createdAt: '$createdAt'
          }
        },
        count: { $sum: 1 }
      }
    },
    { $sort: { '_id': -1 } } // Sort by date descending (newest first)
  ]);
};

// Static method to get data for a specific date
userDataSchema.statics.getByDate = function(userId, date) {
  return this.find({ 
    userId: mongoose.Types.ObjectId(userId), 
    date: date 
  }).sort({ createdAt: -1 });
};

// Static method to delete all data for a specific date
userDataSchema.statics.deleteByDate = function(userId, date) {
  return this.deleteMany({ 
    userId: mongoose.Types.ObjectId(userId), 
    date: date 
  });
};

// Method to format data for export
userDataSchema.methods.toExportFormat = function() {
  return {
    UID: this.uid,
    Password: this.password,
    '2FA Key': this.twoFaKey,
    Email: this.email,
    Date: this.date,
    'Created At': this.createdAt.toISOString()
  };
};

// Method to format data for text export
userDataSchema.methods.toTextFormat = function() {
  return `${this.uid}|${this.password}|${this.twoFaKey}|${this.email}`;
};

module.exports = mongoose.model('UserData', userDataSchema);