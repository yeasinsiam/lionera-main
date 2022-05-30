'use strict';

const OccasionModel = require('../models/occasionModel');
// Importing the model
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Function to get all occasions
const getOccasions = catchAsync(async (req, res, next) => {
  const { lang } = req.query;

  let query = { lang: ['both'] };

  let unselectedLang = '';
  if (lang && lang !== 'both') {
    // unselectedLang = lang === 'ar' ? '-en' : '-ar';
    query.lang.push(lang);
  }
  // if (lang === 'both') {
  //   unselectedLang = ['-ar', '-en'];
  // }

  // const occasions = await OccasionModel.find(query).select(unselectedLang);
  const occasions = await OccasionModel.find(query); // new line

  res.status(200).json({
    success: true,
    body: { occasions },
    query,
    unselectedLang,
  });
});

// Function to get  occasions by ID
const getOccasionsById = catchAsync(async (req, res, next) => {
  let { lang } = req.query;

  let unselectedLang = '';
  if (lang && lang !== 'both') unselectedLang = lang === 'ar' ? '-en' : '-ar';

  const occasion = await OccasionModel.findById(req.params.occasionId).select(
    unselectedLang,
  );

  res.status(200).json({
    success: true,
    body: { occasion },
  });
});

// Function to create an occasion
const createOccasion = catchAsync(async (req, res, next) => {
  const newOccasion = new OccasionModel(req.body);
  const occasion = await newOccasion.save();

  res.status(201).json({
    success: true,
    // body: { occasion },
  });
});

// Function to update an occasion
const updateOccasion = catchAsync(async (req, res, next) => {
  const { occasionId } = req.params;

  if ('en' === req.body.lang) {
    req.body.ar = null;
  } else if ('ar' === req.body.lang) {
    req.body.en = null;
  }

  const occasion = await OccasionModel.findByIdAndUpdate(occasionId, req.body, {
    new: true,
    runValidators: true,
  });
  if (!occasion) return next(new AppError('Not Found', 404));

  res.status(200).json({
    success: true,
    // body: { occasion },
  });
});

// Function to delete an occasion
const deleteOccasion = catchAsync(async (req, res, next) => {
  const { occasionId } = req.params;
  let occasion = await OccasionModel.findByIdAndDelete(occasionId);
  if (!occasion) return next(new AppError('Not Found', 404));

  res.status(200).json({
    success: true,
    // body: { occasion },
  });
});

module.exports = {
  getOccasions,
  getOccasionsById,
  createOccasion,
  updateOccasion,
  deleteOccasion,
};
