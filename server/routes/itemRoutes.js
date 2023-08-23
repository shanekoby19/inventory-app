const express = require('express');
const Item = require('../models/item');

const { 
    update,
    get,
    getAll,
    addDataPropToRequestBody
} = require('../utils/utilsController');

const itemRouter = express.Router();

const {
    isEditor
} = require('../controllers/authController');

itemRouter
    .route('/')
    .get(getAll(Item))

itemRouter
    .route('/:id')
    .get(get(Item))
    .patch(addDataPropToRequestBody(Item), isEditor(Item), update(Item));

module.exports = itemRouter