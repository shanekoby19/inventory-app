const express = require('express');
const Shelf = require('../models/shelf');
const Container = require('../models/container');

const {
    addShelf,
    deleteShelf,
    updateShelf
} = require('../controllers/shelfController');
const { addChildToParent } = require('../utils/utilsController');

const shelfRouter = express.Router({ mergeParams: true });

shelfRouter
    .route('/')
    .post(addShelf);

shelfRouter
    .route('/:id')
    .patch(updateShelf)
    .delete(deleteShelf);

shelfRouter.use('/:parentId/containers', addChildToParent(Shelf, Container, 'containers'))

module.exports = shelfRouter;