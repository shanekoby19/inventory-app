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
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'A warehouse must have at least one owner.']
    },
    editors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    viewers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }]
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;