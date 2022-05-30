'use strict';

const { createShipping, getShippings, updateShipping, deleteShipping, getShippingById } = require('../controllers/shippingController');

// Importing the express router
const shippingRouter = require('express').Router();

// Setting up the routes
shippingRouter.route('/')
    .post(createShipping)
    .get(getShippings)

shippingRouter.route('/:shippingId')
    .get(getShippingById)
    .put(updateShipping)
    .delete(deleteShipping)

module.exports = shippingRouter;
