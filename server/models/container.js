const mongoose = require('mongoose');

const containerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A container must have a name."]
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }],
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

const Container = mongoose.model('Container', containerSchema);

module.exports = Container;