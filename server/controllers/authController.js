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
    }, process.env.JWT_SECRET, { expiresIn: '2hr' });

    // Store the token in a cookie on the users browser.
    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 2, // 2 hours in milliseconds.
        SameSite: 'Lax',
        signed: true
    });

    res.status(200).json({
        user
    });
});


const logout = (req, res, next) => {
    // TODO - Further cookie clean-up
    res.clearCookie('jwt');

    //TODO - Expire token

    res.sendStatus(200);
}

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
 * Checks to see if the currently logged in user is an editor of a resource.
 * @param {*} Model - The model you want to check to see if the user is an editor of.
 * @returns A middleware function that will check to see if logged in user is an editor of the object.
 */
const isEditor = (Model, paramId="id") => {

    return catchAsync(async(req, res, next) => {
        // Get the id off the incoming request.
        const id = req.params[paramId];

        // Try to find the object in the database collection.
        const thing = await Model.findById(id);

        // Check to see if the logged in user is an editor or owner of the object.
        const isEditor = 
        thing?.editors.find((_id) => _id.toString() === req.user._id) || 
        thing.owner.toString() === req.user._id;

        // Return an error if the user is not an editor of the object.
        if(!isEditor) {
            return next(new AppError('You must be an editor of this object to perform this action', 401))
        }

        next();
    });
}

module.exports = {
    login,
    logout,
    isAuthenticated,
    isEditor
}