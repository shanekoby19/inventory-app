const User = require('../models/user');

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

    await User.findByIdAndDelete(userId);

    res.sendStatus(204);
})

const getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        users,
    });
})

module.exports = {
    addUser,
    deleteUser,
    updateUser,
    getAllUsers
}