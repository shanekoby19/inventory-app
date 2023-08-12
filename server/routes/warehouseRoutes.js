const express = require('express');
const shelfRouter = require('./shelfRoutes.js');
const Warehouse = require('../models/warehouse');
const Container = require('../models/container');

const {
    addWarehouse, 
    deleteWarehouse,
    getAllWarehouses
} = require('../controllers/warehouseController.js');

const { 
    addChildToParent 
} = require('../utils/utilsController.js');

const warehouseRouter = express.Router();

warehouseRouter
    .route('/')
    .get(getAllWarehouses)
    .post(addWarehouse);

warehouseRouter
    .route('/:id')
    .delete(deleteWarehouse);

// Nested shelf routes
warehouseRouter.use('/:warehouseId/shelf', shelfRouter)

warehouseRouter.use('/:parentId/containers', addChildToParent(Warehouse, Container, 'containers'))


module.exports = warehouseRouter;