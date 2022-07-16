'use strict';

const { createShippingArea, getShippingAreas, updateShippingArea, deleteShippingArea, getShippingAreaById } = require('../controllers/shippingAreaController');

// Importing the express router
const shippingAreaRouter = require('express').Router();

// Setting up the routes
shippingAreaRouter.route('/')
    .post(createShippingArea)
    .get(getShippingAreas)

shippingAreaRouter.route('/:shippingAreaId')
    .get(getShippingAreaById)
    .put(updateShippingArea)
    .delete(deleteShippingArea)

module.exports = shippingAreaRouter;
