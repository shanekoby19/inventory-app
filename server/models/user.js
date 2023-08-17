const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: { 
        type: String, 
        required: [true, 'A user must have a first name'],
    },
    lastName: {
        type: String, 
        required: [true, 'A user must have a last name.'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (email) => {
              return validator.isEmail(email)
            },
            message: 'Please provide a valid email address.'
        }
    },
    password: {
        type: String,
        required: [true, 'You must provide a password when creating a user.'],
        validate: {
            validator: (password) => {
                return validator.isStrongPassword(password);
            },
            message: 'Invalid password, your password must be at least 8 characters and contain 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special symbol.'
        }
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    }
});

// Hash the users password before saving it to the database.
userSchema.pre('save', async function (next) {
    if (this.isNew) { // Check if the document is being created
        try {
          const hashedPassword = await bcrypt.hash(this.password, 10);
          this.password = hashedPassword;
        } catch (error) {
          return next(error);
        }
    }
    next(); // Continue with the save operation
});

const User = mongoose.model('User', userSchema);

module.exports = User;