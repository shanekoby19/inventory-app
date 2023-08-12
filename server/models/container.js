const mongoose = require('mongoose');

const containerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A container must have a name."]
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }]
});

const Container = mongoose.model('Container', containerSchema);

module.exports = Container;