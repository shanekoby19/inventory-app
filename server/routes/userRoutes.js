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
    deleteUser,
    getAllWarehouses
} = require('../controllers/userController');

const userRouter = express.Router();

userRouter
    .route('/')
    .get(getAll(User))
    .post(addDataPropToRequestBody(User), create(User));

userRouter
    .route('/:id')
    .get(get(User, 'id'))
    .delete(deleteUser)
    .patch(addDataPropToRequestBody(User), update(User));

userRouter
    .route('/:id/warehouses')
    .get(getAllWarehouses);

module.exports = userRouter;
