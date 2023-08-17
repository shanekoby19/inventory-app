const mongoose = require('mongoose');

const appErrorHandler = (err, req, res, next) => {
    // Duplicate Key Error
    if(err.code === 11000) {
        return res.status(400).json({
            message: err.message
        })
    } 
    // Mongoose validator error.
    else if(err instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({
            message: err.message
        })
    } 
    // App Errors (Custom)
    else if(err.isAppError) {
        return res.status(400).json({
            message: err.message
        })
    } 
    // JWT Token Expired
    else if(err.name === 'TokenExpiredError') {
        return res.status(400).json({
            message: `You're login token is no longer valid, please login again to view this resource.`
        })
    }
    // Other JWT errors
    else if(err.name === 'JsonWebTokenError') {
        // Set a custom message if the user has logged out.
        if(err.message === 'jwt must be provided') err.message = 'Please login again to view this resource'

        return res.status(400).json({
            message: err.message
        })
    }
}

module.exports = appErrorHandler;