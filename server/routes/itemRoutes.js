const express = require('express');
const Item = require('../models/item');

const { 
    update,
    get,
    getAll
} = require('../utils/utilsController');

const itemRouter = express.Router();

itemRouter
    .route('/')
    .get(getAll(Item))

itemRouter
    .route('/:id')
    .get(get(Item, "id"))
    .patch(update(Item, "id", "name", "description", "quanity"));

module.exports = itemRouter