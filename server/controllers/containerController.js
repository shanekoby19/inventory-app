const Container = require('../models/container');
const Warehouse = require('../models/warehouse');
const Shelf = require('../models/shelf');

const catchAsync = require('../utils/catchAsync');

const addContainerToWarehouse = catchAsync(async (req, res, next) => {
    const warehouseId = req.params.warehouseId;
    
    // Create the container WITHOUT saving
    const container = new Container({
        name: req.body.name,
        items: req.body.items || []
    });

    const arrayField = 'containers';

    const warehouse = await Warehouse.findByIdAndUpdate(warehouseId, {
        $push: { [arrayField]: container._id }
    });

    await container.save();

    res.status(201).json({
        container,
        warehouse
    })
});

const addContainerToShelf = catchAsync(async (req, res, next) => {
    const shelfId = req.params.shelfId;
    
    // Create the container WITHOUT saving
    const container = new Container({
        name: req.body.name,
        items: req.body.items || []
    });

    const shelf = await Shelf.findByIdAndUpdate(shelfId, {
        $push: { containers: container._id }
    });

    await container.save();

    res.status(201).json({
        container,
        shelf
    })
});

module.exports = {
    addContainerToWarehouse,
    addContainerToShelf,
}