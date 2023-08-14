const express = require('express');
const Container = require('../models/container');
const Item = require('../models/item');

const {
    addChildToParent,
    removeChildFromParent,
    update,
    get,
    getAll
} = require('../utils/utilsController');

const containerRouter = express.Router();

// Manage Individual containers
containerRouter
    .route('/')
    .get(getAll(Container));

containerRouter
    .route('/:id')
    .get(get(Container, "id"))
    .patch(update(Container, "id", "name"))


// Manages items in a warehouse
containerRouter
    .route('/:parentId/items')
    .post(addChildToParent(Container, Item, 'items'))

containerRouter
    .route('/:parentId/items/:childId')
    .delete(removeChildFromParent(Container, Item, 'items', 'undefined'))

module.exports = containerRouter;