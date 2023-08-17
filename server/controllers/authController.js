const User = require('../models/user');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config({
    path: 'server/config/dbconfig.env'
});

const AppError = require('../utils/AppError');

const catchAsync = require('../utils/catchAsync');

const login = catchAsync(async(req, res, next) => {
    const { email, password } = req.body;

    // Make sure the email and password were sent in the request.
    if(!email || !password) {
        return next(new AppError('Your email and password are required to login'), 400);
    }

    // Is there a user with the given email address in the database?
    const user = await User.findOne({ email });

    if(!user) { // Send an error if the email doesn't belong to a current user.
        return next(new AppError('There is no user with this email in the database.'), 401);
    }

    // See if the password given matches the users password in the database.
    const match = await bcrypt.compare(password, user.password);

    if(!match) { // Send an error if the passwords don't match.
        return next(new AppError('The password you gave does not match the password on file.'), 401)
    }

    // Create a jwt which will include a login status and the userId.
    const token = await jwt.sign({
        isLoggedIn: true,
        userId: user._id,
    }, process.env.JWT_SECRET, { expiresIn: '8hr' });

    // Store the token in a cookie on the users browser.
    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 8, // 8 hours
        signed: true
    });

    res.status(200).json({
        user
    });
});

const isAuthenticated = catchAsync(async (req, res, next) => {
    // Get the token from the signed cookie in the request object.
    const token = req.signedCookies.jwt;

    // Decode the token using our secret key.
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    // Check to see if the user is still logged in.
    if(!decoded.isLoggedIn) {
        return next(new AppError('You must login to view this resource.', 401));
    }
    
    next();
});

const logout = (req, res, next) => {
    res.clearCookie('jwt');
    res.sendStatus(200);
}

module.exports = {
    login,
    logout,
    isAuthenticated
}