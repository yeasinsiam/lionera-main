'use strict';

const AddonModel = require('../models/AddonModel');
// Importing the model
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Function to get all addons
const getAddons = catchAsync(async (req, res, next) => {
  let { lang } = req.query

  let addons
  if (lang === 'both') {
    addons = await AddonModel.find();
  } else {
    const unselectedLang = lang === 'ar' ? 'en' : 'ar'
    addons = await AddonModel.find().select(`-${unselectedLang}`);
  }

  res.status(200).json({
    success: true,
    body: { addons },
  });
});

const getAddonById = catchAsync(async (req, res, next) => {
  const { lang } = req.query
  const { addonId } = req.params

  let addon
  if (lang === 'both') {
    addon = await AddonModel.findById(addonId);
  } else {
    const unselectedLang = lang === 'ar' ? 'en' : 'ar'
    addon = await AddonModel.findById(addonId).select(`-${unselectedLang}`);
  }

  if (!addon) return next(new AppError('Not Found', 404))

  res.status(200).json({
    success: true,
    body: { addon },
  });
});

// Function to create a addon
const createAddon = catchAsync(async (req, res, next) => {
  const newAddon = new AddonModel(req.body);
  const addon = await newAddon.save();

  res.status(201).json({
    success: true,
    body: { addon },
  });
});

// Function to update a addon
const updateAddon = catchAsync(async (req, res, next) => {
  const { addonId } = req.params

  const addon = await AddonModel.findByIdAndUpdate(addonId, req.body, { new: true, runValidators: true });
  if (!addon) return next(new AppError('Not Found', 404));

  res.status(200).json({
    success: true,
    body: { addon },
  });
});

// Function to delete a addon
const deleteAddon = catchAsync(async (req, res, next) => {
  const { addonId } = req.params
  let addon = await AddonModel.findByIdAndDelete(addonId);
  if (!addon) return next(new AppError('Not Found', 404));

  res.status(200).json({
    success: true,
    body: { addon },
  });
});

module.exports = {
  getAddons,
  createAddon,
  updateAddon,
  deleteAddon,
  getAddonById
};
