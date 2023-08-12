const mongoose = require('mongoose');

const appErrorHandler = (err, req, res, next) => {
    // Duplicate Key Error
    if(err.code === 11000) {
        return res.status(400).json({
            message: err.message
        })
    } else if(err instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({
            message: err.message
        })
    } else if(err.isAppError) {
        return res.status(400).json({
            message: err.message
        })
    }
}

module.exports = appErrorHandler;