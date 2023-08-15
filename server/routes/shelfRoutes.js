const express = require('express');
const Shelf = require('../models/shelf');
const Container = require('../models/container');
const Item = require('../models/item');

const { 
    addChildToParent,
    removeChildFromParent,
    get,
    getAll,
    update
} = require('../utils/utilsController');

const shelfRouter = express.Router({ mergeParams: true });

// Manage a single shelf
shelfRouter
    .route('/')
    .get(getAll(Shelf))

shelfRouter
    .route('/:id')
    .get(get(Shelf, "id"))
    .patch(update(Shelf, "id", "name"))


// Manage containers in a shelf
shelfRouter
    .route('/:parentId/containers') 
    .post(addChildToParent(Shelf, Container, 'containers'));

shelfRouter
    .route('/:parentId/containers/:childId') 
    .delete(removeChildFromParent(Shelf, Container, 'containers', 'items'));


// Manages items on a shelf
shelfRouter
    .route('/:parentId/items')
    .post(addChildToParent(Shelf, Item, 'items'))

shelfRouter
    .route('/:parentId/items/:childId')
    .delete(removeChildFromParent(Shelf, Item, 'items', 'undefined'))

module.exports = shelfRouter;