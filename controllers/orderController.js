'use strict';

const sendEmail = require('../mail/sendEmail');
const FormModel = require('../models/formModel');
const OrderModel = require('../models/orderModel');
const UserOrderDataModel = require('../models/userOrderDataModel');
const moment = require('moment');
// Importing the model
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const FormDataModel = require('../models/formDataModel');
var ObjectID = require('mongodb').ObjectID;

// Function to get all orders
const getOrders = catchAsync(async (req, res, next) => {
  let { lang, search } = req.query;

  let unselectedLang = '';
  if (lang !== 'both') {
    unselectedLang = lang === 'ar' ? '-en' : '-ar';
  }

  let searchQuary =  search ?
    ObjectID.isValid(search) ? 
      {
        $or:[
          {'_id': search}
        ]
      } : {
        $or:[
          {'shipping.email': search},
        ]
      } : {};
    
  const orders = await OrderModel.find(searchQuary)
    .select(`${unselectedLang}`)
    .populate('occasion', `${unselectedLang}`)
    .populate('design', `${unselectedLang}`)
    .populate('slideshow', `${unselectedLang}`)
    .populate('package')
    .populate('addons', `${unselectedLang}`)
    .populate('shipping.shippingArea', `${unselectedLang}`);
  // .populate('shipping', `${unselectedLang}`)

  res.status(200).json({
    success: true,
    body: { orders },
  });
});

// Function to get all orders
const getOrderAddonAndForms = catchAsync(async (req, res, next) => {
  const { orderId } = req.params;

  const order = await OrderModel.findById(orderId).populate('addons');
  if (!order) return next(new AppError('No Order with this id!', 404));

  // check if the order was created within 24 hours
  if (moment().diff(order.createdAt, 'h') > 24)
    return next(new AppError('Time Expired', 400));

  const forms = await FormModel.find({ package: order.package });
  const addons = order.addons;

  res.status(200).json({
    success: true,
    body: {
      forms,
      addons,
    },
  });
});

// Function to get all orders
const getOrderFormData = catchAsync(async (req, res, next) => {
  const { orderId } = req.params;

  const formData = await FormDataModel.findOne({ order: orderId });

  res.status(200).json({
    success: true,
    body: {
      formData,
    },
  });
});

// Function to get all orders
const insertOrUpdateOrderFormData = catchAsync(async (req, res, next) => {
  const { orderId } = req.params;

  const formData = await FormDataModel.findOneAndUpdate(
    { order: orderId },
    req.body,
    { new: true, runValidators: true, upsert: true },
  );
  await formData.populate('order').execPopulate();

  res.status(200).json({
    success: true,
    body: {
      formData,
    },
  });
});

const getOrderById = catchAsync(async (req, res, next) => {
  let { lang } = req.query;
  let unselectedLang = '';
  if (lang !== 'both') {
    unselectedLang = lang === 'ar' ? '-en' : '-ar';
  }

  const order = await OrderModel.findById(req.params.orderId)
    .select(`${unselectedLang}`)
    .populate('occasion', `${unselectedLang}`)
    .populate('design', `${unselectedLang}`)
    .populate('slideshow', `${unselectedLang}`)
    .populate('package')
    .populate('addons', `${unselectedLang}`)
    .populate('shipping.shippingArea', `${unselectedLang}`);
  // .populate('shipping', `${unselectedLang}`)

  res.status(200).json({
    success: true,
    body: { order },
  });
});

// Function to create a order
const createOrder = catchAsync(async (req, res, next) => {
  const newOrder = new OrderModel(req.body);
  const order = await newOrder.save();

  // sendEmail(order.shipping.email, 'orderConfirmation', order,order.lang)

  res.status(201).json({
    success: true,
    body: { order },
  });
});

// Function to update a order
const updateOrder = catchAsync(async (req, res, next) => {
  let { lang } = req.query;
  let unselectedLang = lang === 'ar' ? 'en' : 'ar';

  const { orderId } = req.params;
  const order = await OrderModel.findByIdAndUpdate(orderId, req.body, {
    new: true,
    runValidators: true,
  });
  // .populate('occasion', `-${unselectedLang}`)
  // .populate('design', `-${unselectedLang}`)
  // .populate('slideshow', `-${unselectedLang}`)
  // .populate('package', `-${unselectedLang}`)
  // .populate('addons', `-${unselectedLang}`)
  // .populate('shipping', `-${unselectedLang}`)
  // .exec();;

  if (!order) return next(new AppError('Not Found', 404));

  console.log('hit', order.shipping.email);

  const { financial_status, order_status } = req.body;
  if (financial_status) {
    // sendEmail(order.shipping.email, 'orderDispatchConfirmation',order,order.lang)
  }

  if (order_status) {
    sendEmail(
      order.shipping.email,
      'orderDispatchConfirmation',
      order,
      order.lang,
    );
  }

  res.status(200).json({
    success: true,
    body: { order },
  });
});

// Function to delete a order
const deleteOrder = catchAsync(async (req, res, next) => {
  const { orderId } = req.params;
  let order = await OrderModel.findByIdAndDelete(orderId);
  if (!order) return next(new AppError('Not Found', 404));

  res.status(200).json({
    success: true,
    body: { order },
  });
});

const createUserOrderData = catchAsync(async (req, res, next) => {
  // if(existingOrder)

  const userOrderData = await UserOrderDataModel.create({
    ...req.body,
    user: req.user.id,
  });

  res.status(200).json({
    success: true,
    body: { userOrderData },
  });
});

module.exports = {
  getOrders,
  getOrderAddonAndForms,
  getOrderFormData,
  insertOrUpdateOrderFormData,
  createOrder,
  createUserOrderData,
  updateOrder,
  deleteOrder,
  getOrderById,
};
