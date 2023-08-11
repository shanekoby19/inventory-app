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

module.exports = {
    addShelf
}