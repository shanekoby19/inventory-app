const express = require('express');
const Shelf = require('../models/shelf');
const Container = require('../models/container');
const Item = require('../models/item');

const { 
    addChildToParent,
    removeChildFromParent,
    get,
    getAll,
    update,
    addDataPropToRequestBody
} = require('../utils/utilsController');

const shelfRouter = express.Router();

// Manage a single shelf
shelfRouter
    .route('/')
    .get(getAll(Shelf))

shelfRouter
    .route('/:id')
    .get(get(Shelf))
    .patch(addDataPropToRequestBody(Shelf), update(Shelf))


// Manage containers in a shelf
shelfRouter
    .route('/:parentId/containers') 
    .post(addDataPropToRequestBody(Container), addChildToParent(Shelf, Container, 'containers'));

shelfRouter
    .route('/:parentId/containers/:childId') 
    .delete(removeChildFromParent(Shelf, Container, 'containers', 'items'));


// Manages items on a shelf
shelfRouter
    .route('/:parentId/items')
    .post(addDataPropToRequestBody(Item), addChildToParent(Shelf, Item, 'items'))

shelfRouter
    .route('/:parentId/items/:childId')
    .delete(removeChildFromParent(Shelf, Item, 'items', 'undefined'))

module.exports = shelfRouter;