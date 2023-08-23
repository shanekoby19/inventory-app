const express = require('express');
const User = require('../models/user');

const {
    addDataPropToRequestBody
} = require('../utils/utilsController');

const {
    isAuthenticated,
} = require('../controllers/authController');

const {
    deleteUser, 
    getAllUsers, 
    createUser, 
    getUser, 
    updateUser
} = require('../controllers/userController');
const AppError = require('../utils/AppError');

const userRouter = express.Router();

const isAuthorizedToCreateUser = (onlyAllowedRole) => {
    return (req, res, next) => {
        // If the logged in user is not an admin and tries to create an admin, throw an error.
        if(onlyAllowedRole === 'user' && req.body.role === 'admin') {
            return next(new AppError('You do not have the credentials to create this resource.'))
        } else if(onlyAllowedRole === 'admin' && req.user.role !== 'admin') {
            return next(new AppError('You do not have the credentials to create this resource.'))
        }
        next();
    }
}

const isAuthorizedToViewOrUpdateUser = () => {
    return (req, res, next) => {
        // If the logged in user is not an admin and tries to view a user other than themselve, throw an error.
        if(req.user.role === 'user' && req.user._id !== req.params.id) {
            return next(new AppError('You do not have the credentials to view or update this resource.'))
        }
        next();
    }
}

const isAdmin = () => {
    return (req, res, next) => {
        if(req.user.role !== 'admin') {
            return next(new AppError('You do not have the credentials to perform this action.'))
        }
        next();
    }
}

userRouter
    .route('/')
    .get(isAuthenticated, isAdmin(), getAllUsers(User))
    .post(addDataPropToRequestBody(User), isAuthorizedToCreateUser('user'), createUser(User));

userRouter
    .route('/:id')
    .get(isAuthenticated, isAuthorizedToViewOrUpdateUser(), getUser(User))
    .delete(isAuthenticated, isAdmin(), deleteUser)
    .patch(isAuthenticated, isAuthorizedToViewOrUpdateUser(), addDataPropToRequestBody(User), updateUser(User));

userRouter
    .route('/admin')
    .post(isAuthenticated, addDataPropToRequestBody(User), isAuthorizedToCreateUser('admin'), createUser(User))

module.exports = userRouter;
