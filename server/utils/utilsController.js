const catchAsync = require('./catchAsync');
const AppError = require('./AppError');

/**
 * A function that gets an item from a collection the database given the item id.
 * @param {*} Model - The model you want to search in.
 * @param {string} idParam  - The id parameter name set in the url of the express route. Defaults to "id".
 * @returns - A middleware function to use in express.
 */
const get = (Model, idParam="id") => {
    return catchAsync(async(req, res, next) => {
        // Extract the id.
        const id = req.params[idParam];
        
        // Find the item given the id.
        const thing = await Model.findById(id);

        // Find all objects where the logged in user is a viewer, editor or owner.
        const viewerOrGreater = thing.viewers.find(_id => _id.toString() === req.user._id) ||
            thing.editors.find(_id => _id.toString() === req.user._id) ||
            thing.owner.toString() === req.user._id;

        if(!viewerOrGreater) {
            return next(new AppError('You do not have access to view this resource.', 401));
        }
    
        // Return the item you found.
        res.status(200).json({
            [Model.modelName.toLowerCase()]: thing
        })
    })
}

/**
 * A function that gets all items from a collection in the database.
 * @param {*} Model - The model you want to search in.
 * @returns - A middleware function to use in express.
 */
const getAll = (Model) => {
    return catchAsync(async(req, res, next) => {
        // Find all instances in the model.
        const things = await Model.find();

        // Find all objects where the logged in user is a viewer, editor or owner.
        const viewerOf = things.filter(thing => {
            return thing?.viewers?.find(_id => _id.toString() === req.user._id) ||
            thing?.editors?.find(_id => _id.toString() === req.user._id) ||
            thing?.owner?.toString() === req.user._id
        });

        res.status(200).json({
            [`${Model.modelName.toLowerCase()}s`]: viewerOf
        })
    })
}

/**
 * A utility function to create objects in the database given a body and some data.
 * @param {*} Model - The model you want to use to add this object to the database.
 * @returns - A middleware function to use in express.
 */
const create = (Model) => {
    return catchAsync(async(req, res, next) => {
        // req.data will contain any valid data passed in that matches the model.
        const thing = await Model.create({
            ...req.data,
            owner: [req.user._id], // Always add the logged in user as the owner.
        });

        res.status(201).json({
            [Model.modelName.toLowerCase()]: thing
        })
    })
}

/**
 * A utility function to update objects in the database given a body and some data.
 * @param {*} Model - The model you want to use to update this object in the database.
 * @param {string} idParam  - The id parameter name set in the url of the express route. Defaults to "id"
 * @returns - A middleware function to use in express.
 */
const update = (Model, paramId="id") => {
    return catchAsync(async(req, res, next) => {
        // Extract the id from the incoming request.
        const id = req.params[paramId];

        const thing = await Model.findByIdAndUpdate(id, req.data, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            [Model.modelName.toLowerCase()]: thing
        })
    })
}

/**
 * A function that removes an item from the database.
 * @param {*} Model - The model you want to use to add this object to the database.
 * @param {string} idParam  - The id parameter name set in the url of the express route. Defaults to "id".
 * @returns - A middleware function to use in express.
 */
const remove = (Model, idParam="id") => {
    return catchAsync(async(req, res, next) => {
        const id = req.params[idParam];
    
        // Delete the user.
        await Model.findByIdAndDelete(id);
    
        res.sendStatus(204);
    })
}

const addChildToParent = (ParentModel, ChildModel, parentRelationArray) => {
    return catchAsync(async (req, res, next) => {
        const parentId = req.params.parentId;
        
        // Create the child object WITHOUT saving
        const child = new ChildModel(req.data);

        // Add the child to the parent.
        const parent = await ParentModel.findByIdAndUpdate(parentId, {
            $push: { [parentRelationArray]: child._id }
        }, { new: true });

        // save the child
        await child.save();

        // Use the model names when sending the response to make it more readable.
        res.status(201).json({
            [ChildModel.modelName.toLowerCase()]: child,
            [ParentModel.modelName.toLowerCase()]: parent
        })
    });
};

const removeChildFromParent = (ParentModel, ChildModel, parentRelationArray, childRelationArray) => {
    return catchAsync(async(req, res, next) => {
        const parentId = req.params.parentId;
        const childId = req.params.childId;

        const child = await ChildModel.findById(childId);

        // Ensure the child has no relational data tied to it.
        if(child[childRelationArray] && child[childRelationArray].length > 0) {
            return next(new AppError(`You cannot delete this item because it still has ${childRelationArray.slice(0, -1)}(s) in it.`));
        }
    
        // Remove the shelf from the warehouse
        const parent = await ParentModel.findByIdAndUpdate(parentId, {
            $pull: { [parentRelationArray]: childId }
        }, { new: true });
    
        // Delete the shelf from the Shelf collection
        await ChildModel.findByIdAndDelete(childId);
    
        res.status(200).json({
            [ParentModel.modelName.toLowerCase()]: parent
        });
    });
}

const addDataPropToRequestBody = (Model) => {
    return (req, res, next) => {
        // Get the keys given the object.
        const keys = Object.keys(Model.schema.obj);

        // Create an item object to hold the data values.
        const data = {};

        // Look through the request model keys and store any data property that matches the model.
        keys.forEach(key => data[key] = req.body[key]);

        // Store the data on the request for the next middleware
        req.data = {...data};

        next();
    }
}

module.exports = {
    addChildToParent,
    removeChildFromParent,
    create,
    remove,
    get,
    getAll,
    update,
    addDataPropToRequestBody,
}