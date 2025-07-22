const mongoose = require('mongoose');

/**
 * Name Schema for DXZ Data Manager
 * Stores Indian names dataset for random name generation
 */
const nameSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    index: true
  },
  surname: {
    type: String,
    required: [true, 'Surname is required'],
    trim: true,
    index: true
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['male', 'female'],
    lowercase: true,
    index: true
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Compound index for unique firstName + surname + gender combinations
nameSchema.index({ firstName: 1, surname: 1, gender: 1 }, { unique: true });

// Index for efficient random selection
nameSchema.index({ gender: 1, isActive: 1 });

// Static method to get random names
nameSchema.statics.getRandomNames = async function(gender, count = 5) {
  const pipeline = [
    { 
      $match: { 
        gender: gender.toLowerCase(),
        isActive: true 
      } 
    },
    { $sample: { size: count } },
    {
      $project: {
        firstName: 1,
        surname: 1,
        fullName: { $concat: ['$firstName', ' ', '$surname'] }
      }
    }
  ];

  return this.aggregate(pipeline);
};

// Static method to get name count by gender
nameSchema.statics.getCountByGender = function(gender) {
  return this.countDocuments({ 
    gender: gender.toLowerCase(),
    isActive: true 
  });
};

// Static method to seed database with names
nameSchema.statics.seedNames = async function() {
  const existingCount = await this.countDocuments();
  
  if (existingCount > 0) {
    console.log('Names already seeded, skipping...');
    return;
  }

  // Sample Indian names data - in production, this would be a comprehensive dataset
  const maleNames = [
    { firstName: 'Aarav', surname: 'Patel' },
    { firstName: 'Aditya', surname: 'Sharma' },
    { firstName: 'Akash', surname: 'Gupta' },
    { firstName: 'Amit', surname: 'Yadav' },
    { firstName: 'Anirudh', surname: 'Singh' },
    { firstName: 'Arjun', surname: 'Verma' },
    { firstName: 'Aryan', surname: 'Joshi' },
    { firstName: 'Ashwin', surname: 'Nair' },
    { firstName: 'Ayush', surname: 'Desai' },
    { firstName: 'Bhavesh', surname: 'Jain' },
    // ... more names would be added here
  ];

  const femaleNames = [
    { firstName: 'Aanya', surname: 'Patel' },
    { firstName: 'Aditi', surname: 'Sharma' },
    { firstName: 'Aishwarya', surname: 'Gupta' },
    { firstName: 'Akanksha', surname: 'Yadav' },
    { firstName: 'Ananya', surname: 'Singh' },
    { firstName: 'Anika', surname: 'Verma' },
    { firstName: 'Anjali', surname: 'Joshi' },
    { firstName: 'Anusha', surname: 'Nair' },
    { firstName: 'Arushi', surname: 'Desai' },
    { firstName: 'Avani', surname: 'Jain' },
    // ... more names would be added here
  ];

  // Prepare data for insertion
  const namesToInsert = [
    ...maleNames.map(name => ({ ...name, gender: 'male' })),
    ...femaleNames.map(name => ({ ...name, gender: 'female' }))
  ];

  try {
    await this.insertMany(namesToInsert);
    console.log(`Seeded ${namesToInsert.length} names to database`);
  } catch (error) {
    console.error('Error seeding names:', error);
  }
};

// Method to get full name
nameSchema.methods.getFullName = function() {
  return `${this.firstName} ${this.surname}`;
};

// Method to generate password format
nameSchema.methods.generatePassword = function(username) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDate = tomorrow.getDate().toString().padStart(2, '0');
  
  return `${username}${this.firstName}@${tomorrowDate}`;
};

module.exports = mongoose.model('Name', nameSchema);