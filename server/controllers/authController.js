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
        user: user
    }, process.env.JWT_SECRET, { expiresIn: '8hr' });

    // Store the token in a cookie on the users browser.
    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 8, // 8 hours
        SameSite: 'Lax',
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

    // Attach the user in the request body.
    req.user = decoded.user;
    
    next();
});

/**
 * 
 * @param {*} role - Checks to see if a user has the minimum required role.
 * @returns A middleware function that will check the users role to ensure they have the access needed to perform some action.
 */
const isAuthorized = (minimumRequiredRole) => {

    const roleHierarchy = {
        admin: 1,
        user: 0,
    }

    // TODO!
    return (req, res, next) => {
        if(roleHierarchy[req.user.role] < roleHierarchy[minimumRequiredRole]) {
            return next(new AppError(`Sorry, you do not have the required authorization to perform this action.`))
        }

        next();
    }
}

const logout = (req, res, next) => {
    res.clearCookie('jwt');
    res.sendStatus(200);
}

module.exports = {
    login,
    logout,
    isAuthenticated,
    isAuthorized
}