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

const {
    isEditor
} = require('../controllers/authController');

const containerRouter = express.Router();

// Manage Individual containers
containerRouter
    .route('/')
    .get(getAll(Container));

containerRouter
    .route('/:id')
    .get(get(Container))
    .patch(addDataPropToRequestBody(Container), isEditor(Container), update(Container))


// Sets up editor protection for all items in a container.
containerRouter
    .use('/:parentId/*', isEditor(Container, "parentId"));

// Manages items in a warehouse
containerRouter
    .route('/:parentId/items')
    .post(addDataPropToRequestBody(Item), addChildToParent(Container, Item, 'items'))

containerRouter
    .route('/:parentId/items/:childId')
    .delete(removeChildFromParent(Container, Item, 'items', 'undefined'))

module.exports = containerRouter;