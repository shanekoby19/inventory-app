const Warehouse = require('../models/warehouse');
const catchAsync = require('../utils/catchAsync');

const addWarehouse = catchAsync(async(req, res, next) => {
    const warehouse = {
        name: req.body.name,
        owners: [...req.body.owners]
    }

    const newWarehouse = await Warehouse.create(warehouse);

    res.status(200).json({
        warehouse: newWarehouse
    });
});

const deleteWarehouse = catchAsync(async(req, res, next) => {
    const warehouseId = req.params.id;

    await Warehouse.findByIdAndDelete(warehouseId);

    res.sendStatus(204);
});

const getAllWarehouses = catchAsync(async(req, res, next) => {
    const warehouses = await Warehouse.find().populate('owners');

    res.status(200).json({
        warehouses
    })
});

module.exports = {
    addWarehouse,
    deleteWarehouse,
    getAllWarehouses
}