const Shelf = require('../models/shelf');
const Warehouse = require('../models/warehouse');

const catchAsync = require('../utils/catchAsync');

const addShelf = catchAsync(async (req, res, next) => {
    const warehouseId = req.params.warehouseId;

    // Create the shelf document WITHOUT saving.
    const shelf = new Shelf({
        name: req.body.name,
        containers: req.body.containers || []
    });

    // Add the shelf to the warehouse
    const warehouse = await Warehouse.findByIdAndUpdate(warehouseId, {
        $push: { shelves: shelf._id }
    }, { new: true })

    // Only save the shelf to the Shelf collection if the warehouse operation was successful
    await shelf.save();

    res.status(201).json({
        shelf,
        warehouse
    })
});

const updateShelf = catchAsync(async(req, res, next) => {
    const shelfId = req.params.id;

    const shelf = await Shelf.findByIdAndUpdate(shelfId, {
        name: req.body.name,
    }, { new: true });

    res.status(200).json({
        shelf
    });
});

const deleteShelf = catchAsync(async(req, res, next) => {
    const warehouseId = req.params.warehouseId;
    const shelfId = req.params.id;

    // Remove the shelf from the warehouse
    const warehouse = await Warehouse.findByIdAndUpdate(warehouseId, {
        $pull: { shelves: shelfId }
    }, { new: true });

    // Delete the shelf from the Shelf collection
    await Shelf.findByIdAndDelete(shelfId);

    res.status(200).json({
        warehouse
    });
});

module.exports = {
    addShelf,
    deleteShelf,
    updateShelf
}