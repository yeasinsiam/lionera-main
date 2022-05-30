'use strict';

const {createOrder,successOrder}=require("../controllers/paymentController")
// Importing the express router
const paymentRouter = require('express').Router();

// Setting up the routes
paymentRouter.route('/')
    .post(createOrder)

paymentRouter.route("/success")
    .get(successOrder)
module.exports = paymentRouter;
