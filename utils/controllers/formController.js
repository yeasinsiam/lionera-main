'use strict';

const FormModel = require('../models/FormModel');
// Importing the model
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Function to get all forms
const getForms = catchAsync(async (req, res, next) => {
  let { lang } = req.query

  let forms
  if (lang === 'both') {
    forms = await FormModel.find();
  } else {
    const unselectedLang = lang === 'ar' ? 'en' : 'ar'
    forms = await FormModel.find().select(`-${unselectedLang}`);
  }
  res.status(200).json({
    success: true,
    body: { forms },
  });
});

// Function to create a form
const createForm = catchAsync(async (req, res, next) => {
  const newForm = new FormModel(req.body);
  const form = await newForm.save();

  res.status(201).json({
    success: true,
    body: { form },
  });
});

// Function to update a form
const updateForm = catchAsync(async (req, res, next) => {
  const { formId } = req.params

  const form = await FormModel.findByIdAndUpdate(formId, req.body, { new: true, runValidators: true });
  if (!form) return next(new AppError('Not Found', 404));

  res.status(200).json({
    success: true,
    body: { form },
  });
});

// Function to delete a form
const deleteForm = catchAsync(async (req, res, next) => {
  const { formId } = req.params
  let form = await FormModel.findByIdAndDelete(formId);
  if (!form) return next(new AppError('Not Found', 404));

  res.status(200).json({
    success: true,
    body: { form },
  });
});

module.exports = {
  getForms,
  createForm,
  updateForm,
  deleteForm,
};
