const User = require('../models/user');
const bcrypt = require('bcrypt');
const AppError = require('../utils/AppError');

const catchAsync = require('../utils/catchAsync');

const login = catchAsync(async(req, res, next) => {
    const { email, password } = req.body;

    // Make sure the email and password were sent in the request.
    if(!email || !password) {
        return next(new AppError('Your email and password are required to login'));
    }

    // Is there a user with the given email address in the database?
    const user = await User.findOne({ email });

    if(!user) { // Send an error if the email doesn't belong to a current user.
        return next(new AppError('There is no user with this email in the database.'));
    }

    // See if the password given matches the users password in the database.
    const match = await bcrypt.compare(password, user.password);

    if(!match) { // Send an error if the passwords don't match.
        return next(new AppError('The password you gave does not match the password on file.'))
    }

    res.status(200).json({
        user
    })
});

module.exports = {
    login
}