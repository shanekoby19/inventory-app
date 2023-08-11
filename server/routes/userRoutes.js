const express = require('express');

const {
    getAllUsers,
    addUser,
    deleteUser,
    updateUser,
    getAllWarehouses
} = require('../controllers/userController');

const userRouter = express.Router();

userRouter
    .route('/')
    .get(getAllUsers)
    .post(addUser);

userRouter
    .route('/:id')
    .delete(deleteUser)
    .patch(updateUser);

userRouter
    .route('/:id/warehouses')
    .get(getAllWarehouses);

module.exports = userRouter;
