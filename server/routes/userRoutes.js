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
    isAuthenticated
} = require('../controllers/authController');

const {
    deleteUser,
    getAllWarehouses
} = require('../controllers/userController');

const userRouter = express.Router();

userRouter
    .route('/')
    .get(isAuthenticated, getAll(User))
    .post(addDataPropToRequestBody(User), create(User));

userRouter
    .route('/:id')
    .get(isAuthenticated, get(User, 'id'))
    .delete(isAuthenticated, deleteUser)
    .patch(isAuthenticated, addDataPropToRequestBody(User), update(User));

userRouter
    .route('/:id/warehouses')
    .get(isAuthenticated, getAllWarehouses);

module.exports = userRouter;
