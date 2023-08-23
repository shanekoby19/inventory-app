const User = require('../models/user');
const Warehouse = require('../models/warehouse');

const catchAsync = require('../utils/catchAsync');

/**
 * A function that gets an item from a collection the database given the item id.
 * @param {*} Model - The model you want to search in.
 * @param {string} idParam  - The id parameter name set in the url of the express route. Defaults to "id".
 * @returns - A middleware function to use in express.
 */
const getUser = (Model, idParam="id") => {
    return catchAsync(async(req, res, next) => {
        // Extract the id.
        const id = req.params[idParam];
        
        // Find the item given the id.
        const user = await Model.findById(id);
    
        // Return the item you found.
        res.status(200).json({
            [Model.modelName.toLowerCase()]: user
        })
    })
}

/**
 * A function that gets all items from a collection in the database.
 * @param {*} Model - The model you want to search in.
 * @returns - A middleware function to use in express.
 */
const getAllUsers = (Model) => {
    return catchAsync(async(req, res, next) => {
        // Find all instances in the model.
        const users = await Model.find();

        res.status(200).json({
            [`${Model.modelName.toLowerCase()}s`]: users
        })
    })
}

/**
 * A utility function to create objects in the database given a body and some data.
 * @param {*} Model - The model you want to use to add this object to the database.
 * @returns - A middleware function to use in express.
 */
const createUser = (Model) => {
    return catchAsync(async(req, res, next) => {
        // req.data will contain any valid data passed in that matches the model.
        const user = await Model.create(req.data);

        res.status(201).json({
            [Model.modelName.toLowerCase()]: user
        })
    })
}

/**
 * A utility function to update objects in the database given a body and some data.
 * @param {*} Model - The model you want to use to update this object in the database.
 * @param {string} idParam  - The id parameter name set in the url of the express route. Defaults to "id"
 * @returns - A middleware function to use in express.
 */
const updateUser = (Model, paramId="id") => {
    return catchAsync(async(req, res, next) => {
        // Extract the id from the incoming request.
        const id = req.params[paramId];

        const user = await Model.findByIdAndUpdate(id, req.data, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            [Model.modelName.toLowerCase()]: user
        })
    })
}

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
    getUser,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
}