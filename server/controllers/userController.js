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
});

module.exports = {
    deleteUser
}