'use strict';

const ShippingAreaModel = require('../models/ShippingAreaModel');
// Importing the model
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Function to get all shipping areas
const getShippingAreas= catchAsync(async (req, res, next) => {
  
  const shippingAreas = await ShippingAreaModel.find();
  res.status(200).json({
    success: true,
    body: { shippingAreas },
  });
});

const getShippingAreaById = catchAsync(async (req, res, next) => {
  const { shippingAreaId } = req.params

  const shippingArea = await ShippingAreaModel.findById(shippingAreaId);

  if (!shippingArea) return next(new AppError('Not Found', 404))

  res.status(200).json({
    success: true,
    body: { shippingArea },
  });
});

// Function to create a shipping area
const createShippingArea = catchAsync(async (req, res, next) => {
  const newShippingArea= new ShippingAreaModel(req.body);
  const shippingArea = await newShippingArea.save();

  res.status(201).json({
    success: true,
    body: { shippingArea },
  });
});

// Function to update a shipping area
const updateShippingArea = catchAsync(async (req, res, next) => {
  const { shippingAreaId } = req.params

  const shippingArea = await ShippingAreaModel.findByIdAndUpdate(shippingAreaId, req.body, { new: true, runValidators: true });
  if (!shippingArea) return next(new AppError('Not Found', 404));

  res.status(200).json({
    success: true,
    body: { shippingArea },
  });
});

// Function to delete a shipping area
const deleteShippingArea = catchAsync(async (req, res, next) => {
  const { shippingAreaId } = req.params
  let shippingArea = await ShippingAreaModel.findByIdAndDelete(shippingAreaId);
  if (!shippingArea) return next(new AppError('Not Found', 404));

  res.status(200).json({
    success: true,
    body: { shippingArea },
  });
});

module.exports = {
  getShippingAreas,
  getShippingAreaById,
  createShippingArea,
  updateShippingArea,
  deleteShippingArea,
};
