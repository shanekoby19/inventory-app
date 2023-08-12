const express = require('express');
const updateItem = require('../controllers/itemController');

const itemRouter = express.Router();

itemRouter
    .route('/:itemId')
    .patch(updateItem);

module.exports = itemRouter