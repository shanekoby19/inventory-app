const express = require('express');

const {
    addShelf
} = require('../controllers/shelfController');

const shelfRouter = express.Router({ mergeParams: true });

shelfRouter
    .route('/')
    .post(addShelf);


module.exports = shelfRouter;