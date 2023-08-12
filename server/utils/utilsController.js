const catchAsync = require('./catchAsync');

const addChildToParent = (ParentModel, ChildModel, arrayField) => {
    return catchAsync(async (req, res, next) => {
        const parentId = req.params.parentId;
        
        // Create the child object WITHOUT saving
        const child = new ChildModel({
            name: req.body.name,
            items: req.body.items || []
        });

        // Add the child to the parent.
        const parent = await ParentModel.findByIdAndUpdate(parentId, {
            $push: { [arrayField]: child._id }
        });

        // save the child
        await child.save();

        // Use the model names when sending the response to make it more readable.
        res.status(201).json({
            [ChildModel.modelName.toLowerCase()]: child,
            [ParentModel.modelName.toLowerCase()]: parent
        })
    });
};

module.exports = {
    addChildToParent
}