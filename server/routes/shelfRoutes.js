const express = require('express');
const Shelf = require('../models/shelf');
const Container = require('../models/container');
const Item = require('../models/item');

const {
    updateShelf
} = require('../controllers/shelfController');

const { 
    addChildToParent,
    removeChildFromParent 
} = require('../utils/utilsController');

const shelfRouter = express.Router({ mergeParams: true });

// Manage a single shelf
shelfRouter
    .route('/:id')
    .patch(updateShelf)


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