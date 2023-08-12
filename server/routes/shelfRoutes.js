const express = require('express');
const Shelf = require('../models/shelf');
const Container = require('../models/container');

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
    .post(addChildToParent(Shelf, Container, 'containers'))

shelfRouter
    .route('/:parentId/containers/:childId') 
    .delete(removeChildFromParent(Shelf, Container, 'containers'))

module.exports = shelfRouter;