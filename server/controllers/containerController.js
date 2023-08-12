const Container = require('../models/container');

const catchAsync = require('../utils/catchAsync');

const updateContainer = catchAsync(async(req, res, next) => {
    const containerId = req.params.containerId;

    const updatedContainer = await Container.findByIdAndUpdate(containerId, {
        name: req.body.name
    }, { new: true });

    res.status(200).json({
        container: updatedContainer
    })
});

module.exports = updateContainer;