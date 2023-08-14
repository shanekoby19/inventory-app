const User = require('../models/user');
const Warehouse = require('../models/warehouse');

const catchAsync = require('../utils/catchAsync');

const deleteUser = catchAsync(async(req, res, next) => {
    const userId = req.params.id;

    // Delete all warehouse before deleting this user.
    await Warehouse.deleteMany({ 
        owners: { _id: userId }
    });

    // Delete the user.
    await User.findByIdAndDelete(userId);

    res.sendStatus(204);
})

const getAllWarehouses = catchAsync(async(req, res, next) => {
    const userId = req.params.id;

    // Find all warehouses with the given userId.
    const warehouses = await Warehouse.find({ 
        owners: { _id: userId }
    });

    res.status(200).json({
        warehouses
    })
});

module.exports = {
    deleteUser,
    getAllWarehouses
}