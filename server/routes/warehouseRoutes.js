const express = require('express');

const Warehouse = require('../models/warehouse');
const Shelf = require('../models/shelf');
const Container = require('../models/container');
const Item = require('../models/item');

const {
    addWarehouse, 
    deleteWarehouse,
    getAllWarehouses
} = require('../controllers/warehouseController.js');

const { 
    addChildToParent, removeChildFromParent 
} = require('../utils/utilsController.js');

const warehouseRouter = express.Router();

warehouseRouter
    .route('/')
    .get(getAllWarehouses)
    .post(addWarehouse);

warehouseRouter
    .route('/:id')
    .delete(deleteWarehouse);

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