const Item = require('../models/item');

const catchAsync = require('../utils/catchAsync');

const updateItem = catchAsync(async(req, res, next) => {
    const itemId = req.params.itemId;
    
    const updatedItem = await Item.findByIdAndUpdate(itemId, {
        name: req.body.name,
        quantity: req.body.quantity,
        description: req.body.description
    }, {
        runValidators: true,
        new: true
    });

    res.status(200).json({
        item: updatedItem
    });
});

module.exports = updateItem;