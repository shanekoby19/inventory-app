const express = require('express');
const Item = require('../models/item');

const { 
    update,
    get,
    getAll,
    addDataPropToRequestBody
} = require('../utils/utilsController');

const itemRouter = express.Router();

itemRouter
    .route('/')
    .get(getAll(Item))

itemRouter
    .route('/:id')
    .get(get(Item))
    .patch(addDataPropToRequestBody(Item), update(Item));

module.exports = itemRouter