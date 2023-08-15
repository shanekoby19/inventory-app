const express = require('express');

const {
    login,
    logout
} = require('../controllers/authController');

const authRouter = express.Router();

authRouter
    .route('/login')
    .post(login);

authRouter
    .route('/logout')
    .get(logout);

module.exports = authRouter;