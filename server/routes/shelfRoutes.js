const express = require('express');

const {
    addShelf,
    deleteShelf,
    updateShelf
} = require('../controllers/shelfController');

const shelfRouter = express.Router({ mergeParams: true });

shelfRouter
    .route('/')
    .post(addShelf);

shelfRouter
    .route('/:id')
    .patch(updateShelf)
    .delete(deleteShelf);


module.exports = shelfRouter;