const express = require('express');
const updateContainer = require('../controllers/containerController');

const containerRouter = express.Router();

containerRouter
    .route('/:containerId')
    .patch(updateContainer)

module.exports = containerRouter;