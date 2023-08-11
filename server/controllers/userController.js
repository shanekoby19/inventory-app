const User = require('../models/user');
const Warehouse = require('../models/warehouse');

const catchAsync = require('../utils/catchAsync');

const addUser = catchAsync(async (req, res, next) => {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
    }

    const newUser = await User.create(user);

    res.status(200).json({
        user: newUser
    });
});

const updateUser = catchAsync(async(req, res, next) => {
    const userId = req.body.id;
    
    const userUpdates = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
    }

    const updatedUser = await User.findOneAndUpdate(userId, userUpdates, {
        new: true,
    });

    res.status(200).json({
        user: updatedUser
    })

});

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

const getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        users,
    });
});

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
    addUser,
    deleteUser,
    updateUser,
    getAllUsers,
    getAllWarehouses
}