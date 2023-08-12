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
        default: 1,
        min: [1, "The quantity has to be at least 1."]
    }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;