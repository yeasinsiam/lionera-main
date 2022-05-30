'use strict';

const ShippingModel = require('../models/shippingModel');
// Importing the model
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Function to get all shippings
const getShippings = catchAsync(async (req, res, next) => {
  let { lang } = req.query
  let unselectedLang = lang === 'ar' ? 'en' : 'ar'

  const shippings = await ShippingModel.find().select(`-${unselectedLang}`);

  res.status(200).json({
    success: true,
    body: { shippings },
  });
});

const getShippingById = catchAsync(async (req, res, next) => {
  const { lang } = req.query
  const { shippingId } = req.params

  let shipping
  if (lang === 'both') {
    shipping = await ShippingModel.findById(shippingId);
  } else {
    const unselectedLang = lang === 'ar' ? 'en' : 'ar'
    shipping = await ShippingModel.findById(shippingId).select(`-${unselectedLang}`);
  }

  if (!shipping) return next(new AppError('Not Found', 404))

  res.status(200).json({
    success: true,
    body: { shipping },
  });
});

// Function to create a shipping
const createShipping = catchAsync(async (req, res, next) => {
  const newShipping = new ShippingModel(req.body);
  const shipping = await newShipping.save();

  res.status(201).json({
    success: true,
    body: { shipping },
  });
});

// Function to update a shipping
const updateShipping = catchAsync(async (req, res, next) => {
  const { shippingId } = req.params

  const shipping = await ShippingModel.findByIdAndUpdate(shippingId, req.body, { new: true, runValidators: true });
  if (!shipping) return next(new AppError('Not Found', 404));

  res.status(200).json({
    success: true,
    body: { shipping },
  });
});

// Function to delete a shipping
const deleteShipping = catchAsync(async (req, res, next) => {
  const { shippingId } = req.params
  let shipping = await ShippingModel.findByIdAndDelete(shippingId);
  if (!shipping) return next(new AppError('Not Found', 404));

  res.status(200).json({
    success: true,
    body: { shipping },
  });
});

module.exports = {
  getShippings,
  getShippingById,
  createShipping,
  updateShipping,
  deleteShipping,
};
