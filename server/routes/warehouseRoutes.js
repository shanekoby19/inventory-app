const express = require('express');
const shelfRouter = require('./shelfRoutes.js');

const {
    addWarehouse, 
    deleteWarehouse,
    getAllWarehouses
} = require('../controllers/warehouseController.js');

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


module.exports = warehouseRouter;