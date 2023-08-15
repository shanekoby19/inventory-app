const express = require('express');
const User = require('../models/user');

const {
    get,
    getAll,
    create,
    update,
} = require('../utils/utilsController');

const {
    isAuthorized
} = require('../controllers/authController');

const {
    deleteUser,
    getAllWarehouses
} = require('../controllers/userController');

const userRouter = express.Router();

userRouter
    .route('/')
    .get(isAuthorized, getAll(User))
    .post(create(User, "firstName", "lastName", "email", "password"));

userRouter
    .route('/:id')
    .get(get(User, 'id'))
    .delete(deleteUser)
    .patch(update(User, 'id', 'firstName', 'lastName', 'email', 'password'));

userRouter
    .route('/:id/warehouses')
    .get(getAllWarehouses);

module.exports = userRouter;
