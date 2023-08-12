const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "An item must have a name."]
    },
    description: {
        type: String,
    },
    quantity: {
        type: Number,
        default: 0,
        min: [0, "The quantity cannot be negative."]
    }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;