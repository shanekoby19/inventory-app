const express = require('express');
const Container = require('../models/container');
const Item = require('../models/item');

const updateContainer = require('../controllers/containerController');
const {
    addChildToParent,
    removeChildFromParent
} = require('../utils/utilsController');

const containerRouter = express.Router();

containerRouter
    .route('/:containerId')
    .patch(updateContainer)


// Manages items in a warehouse
containerRouter
    .route('/:parentId/items')
    .post(addChildToParent(Container, Item, 'items'))

containerRouter
    .route('/:parentId/items/:childId')
    .delete(removeChildFromParent(Container, Item, 'items', 'undefined'))

module.exports = containerRouter;