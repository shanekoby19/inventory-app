const express = require('express');
const Container = require('../models/container');
const Item = require('../models/item');

const {
    addChildToParent,
    removeChildFromParent,
    update,
    get,
    getAll,
    addDataPropToRequestBody
} = require('../utils/utilsController');

const containerRouter = express.Router();

// Manage Individual containers
containerRouter
    .route('/')
    .get(getAll(Container));

containerRouter
    .route('/:id')
    .get(get(Container))
    .patch(addDataPropToRequestBody(Container), update(Container))


// Manages items in a warehouse
containerRouter
    .route('/:parentId/items')
    .post(addDataPropToRequestBody(Item), addChildToParent(Container, Item, 'items'))

containerRouter
    .route('/:parentId/items/:childId')
    .delete(removeChildFromParent(Container, Item, 'items', 'undefined'))

module.exports = containerRouter;