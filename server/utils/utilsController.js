const catchAsync = require('./catchAsync');
const AppError = require('./AppError');

/**
 * A function that gets an item from a collection the database given the item id.
 * @param {*} Model - The model you want to search in.
 * @param {string} idParam  - The id parameter name set in the url of the express route.
 * @returns - A middleware function to use in express.
 */
const get = (Model, idParam) => {
    return catchAsync(async(req, res, next) => {
        // Extract the id.
        const id = req.params[idParam];
    
        // Find the item given the id.
        const thing = await Model.findById(id);
    
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
    
        res.status(200).json({
            [`${Model.modelName.toLowerCase()}s`]: things
        })
    })
}

/**
 * A utility function to create objects in the database given a body and some data.
 * @param {*} Model - The model you want to use to add this object to the database.
 * @param  {...string} props - The properties needed to successfully add the object to the database.
 * @returns - A middleware function to use in express.
 */
const create = (Model, ...props) => {
    return catchAsync(async(req, res, next) => {
        // Extract the data given the rest parameters
        const data = {};
        props.forEach((value) => {
            data[value] = req.body[value];
        });

        const thing = await Model.create(data);

        res.status(201).json({
            [Model.modelName.toLowerCase()]: thing
        })
    })
}

/**
 * A utility function to update objects in the database given a body and some data.
 * @param {*} Model - The model you want to use to update this object in the database.
 * @param {string} idParam  - The id parameter name set in the url of the express route.
 * @param  {...string} props - The properties needed to successfully update the object in the database.
 * @returns - A middleware function to use in express.
 */
const update = (Model, paramId, ...props) => {
    return catchAsync(async(req, res, next) => {
        // Extract the id from the incoming request.
        const id = req.params[paramId];

        // Extract the data given the rest parameters
        const data = {};
        props.forEach((value) => {
            data[value] = req.body[value];
        });

        const thing = await Model.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        })

        res.status(200).json({
            [Model.modelName.toLowerCase()]: thing
        })
    })
}

/**
 * A function that removes an item from the database.
 * @param {*} Model - The model you want to use to add this object to the database.
 * @param {string} idParam  - The id parameter name set in the url of the express route.
 * @returns - A middleware function to use in express.
 */
const remove = (Model, idParam) => {
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
        const child = new ChildModel({
            name: req.body.name,
            description: req.body.description,
            quantity: req.body.quanity,
        });

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

module.exports = {
    addChildToParent,
    removeChildFromParent,
    create,
    remove,
    get,
    getAll,
    update
}