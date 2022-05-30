'use strict';

const { createOrder, getOrders, deleteOrder, updateOrder, getOrderById, getOrderAddonAndForms, createUserOrderData, getOrderFormData, insertOrUpdateOrderFormData } = require('../controllers/orderController');
const { protect } = require('../middlewares/protect');

// Importing the express router
const orderRouter = require('express').Router();


// Setting up the routes
orderRouter.route('/')
    .get(getOrders)
    .post(createOrder)

orderRouter.route('/user-data')
    .post(protect, createUserOrderData)

orderRouter.route('/:orderId/form').get(getOrderAddonAndForms)

orderRouter.route('/:orderId/form-data')
    .get(getOrderFormData)
    .put(insertOrUpdateOrderFormData)

orderRouter.route('/:orderId')
    .get(getOrderById)
    .put(updateOrder)
    .delete(deleteOrder)

module.exports = orderRouter;
