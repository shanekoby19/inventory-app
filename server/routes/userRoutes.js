const express = require('express');

const {
    getAllUsers,
    addUser,
    deleteUser,
    updateUser
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

module.exports = userRouter;
