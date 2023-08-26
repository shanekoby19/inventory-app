const mongoose = require('mongoose');

const shelfSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A shelf must have a name']
    },
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

shelfSchema.pre(/^find/, function(next) {
    this
        .populate('containters')
        .populate('items');

    next();
})

const Shelf = mongoose.model('Shelf', shelfSchema);

module.exports = Shelf;