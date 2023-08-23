const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    shelves: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shelf',
    }],
    containers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Container'
    }],
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

const Warehouse = mongoose.model('Warehouse', warehouseSchema);

module.exports = Warehouse;