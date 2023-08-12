const catchAsync = require('./catchAsync');
const AppError = require('./AppError');

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

        console.log(child[childRelationArray])

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
    removeChildFromParent
}