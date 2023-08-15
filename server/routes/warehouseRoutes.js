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
} = require('../utils/utilsController.js');

const warehouseRouter = express.Router();

warehouseRouter
    .route('/')
    .get(getAll(Warehouse))
    .post(create(Warehouse, "name", "owners"));

warehouseRouter
    .route('/:id')
    .get(get(Warehouse, "id"))
    .patch(update(Warehouse, "id", "name"))
    .delete(remove(Warehouse, "id"));

// Manages shelves in a warehouse
warehouseRouter
    .route('/:parentId/shelves')
    .post(addChildToParent(Warehouse, Shelf, 'shelves'));

warehouseRouter
    .route('/:parentId/shelves/:childId')
    .delete(removeChildFromParent(Warehouse, Shelf, 'shelves', 'containers'));

// Manages containers in a warehouse
warehouseRouter
    .route('/:parentId/containers')
    .post(addChildToParent(Warehouse, Container, 'containers'))

warehouseRouter
    .route('/:parentId/containers/:childId')
    .delete(removeChildFromParent(Warehouse, Container, 'containers', 'items'))

// Manages items in a warehouse
warehouseRouter
    .route('/:parentId/items')
    .post(addChildToParent(Warehouse, Item, 'items'))

warehouseRouter
    .route('/:parentId/items/:childId')
    .delete(removeChildFromParent(Warehouse, Item, 'items', 'undefined'))

module.exports = warehouseRouter;