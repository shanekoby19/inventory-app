const express = require('express');
const User = require('../models/user');

const {
    get,
    getAll,
    create,
    update,
    addDataPropToRequestBody
} = require('../utils/utilsController');

const {
    isAuthenticated, isAuthorized
} = require('../controllers/authController');

const {
    deleteUser,
    getAllWarehouses
} = require('../controllers/userController');

const userRouter = express.Router();

userRouter
    .route('/')
    .get(isAuthenticated, isAuthorized('admin'), getAll(User))
    .post(addDataPropToRequestBody(User), isAuthorized('admin'), create(User));

userRouter
    .route('/:id')
    .get(isAuthenticated, isAuthorized('admin'), get(User))
    .delete(isAuthenticated, isAuthorized('admin'), deleteUser)
    .patch(isAuthenticated, isAuthorized('admin'), addDataPropToRequestBody(User), update(User));

userRouter
    .route('/:id/warehouses')
    .get(isAuthenticated, getAllWarehouses);

module.exports = userRouter;
