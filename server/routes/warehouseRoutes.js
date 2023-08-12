const express = require('express');

const Warehouse = require('../models/warehouse');
const Shelf = require('../models/shelf');
const Container = require('../models/container');

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
    .route('/:parentId/shelf')
    .post(addChildToParent(Warehouse, Shelf, 'shelves'));

warehouseRouter
    .route('/:parentId/shelf/:childId')
    .delete(removeChildFromParent(Warehouse, Shelf, 'shelves'));

// Manages containers in a warehouse
warehouseRouter
    .route('/:parentId/containers')
    .get(addChildToParent(Warehouse, Container, 'containers'))

warehouseRouter
    .route('/:parentId/containers/:childId')
    .delete(removeChildFromParent(Warehouse, Container, 'containers'))



module.exports = warehouseRouter;