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
});

const Shelf = mongoose.model('Shelf', shelfSchema);

module.exports = Shelf;