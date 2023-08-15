const express = require('express');

const Warehouse = require('../models/warehouse');
const Shelf = require('../models/shelf');
const Container = require('../models/container');
const Item = require('../models/item');

const { 
    addChildToParent, 
    removeChildFromParent,
    get,
    getAll,
    update,
    create,
    remove,
    addDataPropToRequestBody
} = require('../utils/utilsController.js');

const warehouseRouter = express.Router();

warehouseRouter
    .route('/')
    .get(getAll(Warehouse))
    .post(addDataPropToRequestBody(Warehouse), create(Warehouse));

warehouseRouter
    .route('/:id')
    .get(get(Warehouse))
    .patch(addDataPropToRequestBody(Warehouse), update(Warehouse))
    .delete(remove(Warehouse));

// Manages shelves in a warehouse
warehouseRouter
    .route('/:parentId/shelves')
    .post(addDataPropToRequestBody(Shelf), addChildToParent(Warehouse, Shelf, 'shelves'));

warehouseRouter
    .route('/:parentId/shelves/:childId')
    .delete(removeChildFromParent(Warehouse, Shelf, 'shelves', 'containers'));

// Manages containers in a warehouse
warehouseRouter
    .route('/:parentId/containers')
    .post(addDataPropToRequestBody(Container), addChildToParent(Warehouse, Container, 'containers'))

warehouseRouter
    .route('/:parentId/containers/:childId')
    .delete(removeChildFromParent(Warehouse, Container, 'containers', 'items'))

// Manages items in a warehouse
warehouseRouter
    .route('/:parentId/items')
    .post(addDataPropToRequestBody(Item), addChildToParent(Warehouse, Item, 'items'))

warehouseRouter
    .route('/:parentId/items/:childId')
    .delete(removeChildFromParent(Warehouse, Item, 'items', 'undefined'))

module.exports = warehouseRouter;