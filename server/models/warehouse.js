const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    owners: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'A warehouse must have at least one owner.']
    }],
    shelves: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shelf',
    }]
});

warehouseSchema.pre('find', async function () {
    // Use 'this' to access the query being executed
    this.populate('owners');
});

const Warehouse = mongoose.model('Warehouse', warehouseSchema);

module.exports = Warehouse;