const express = require('express');
const User = require('../models/user');

const {
    get,
    getAll,
    create,
    update,
} = require('../utils/utilsController');

const {
    deleteUser,
    getAllWarehouses
} = require('../controllers/userController');

const userRouter = express.Router();

userRouter
    .route('/')
    .get(getAll(User))
    .post(create(User, "firstName", "lastName", "email"));

userRouter
    .route('/:id')
    .get(get(User, 'id'))
    .delete(deleteUser)
    .patch(update(User, 'id', 'firstName', 'lastName', 'email'));

userRouter
    .route('/:id/warehouses')
    .get(getAllWarehouses);

module.exports = userRouter;
