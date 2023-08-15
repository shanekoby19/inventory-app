const express = require('express');

const {
    login
} = require('../controllers/authController');

const authRouter = express.Router();

authRouter
    .route('/login')
    .post(login);

module.exports = authRouter;