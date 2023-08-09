const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { 
        type: String, 
        required: [true, 'A user must have a first name'],
    },
    lastName: {
        type: String, 
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;