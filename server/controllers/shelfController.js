const Shelf = require('../models/shelf');
const Warehouse = require('../models/warehouse');

const catchAsync = require('../utils/catchAsync');

const updateShelf = catchAsync(async(req, res, next) => {
    const shelfId = req.params.id;

    const shelf = await Shelf.findByIdAndUpdate(shelfId, {
        name: req.body.name,
    }, { new: true });

    res.status(200).json({
        shelf
    });
});

module.exports = {
    updateShelf
}