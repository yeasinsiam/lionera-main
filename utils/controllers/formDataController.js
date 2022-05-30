'use strict';

const FormDataModel = require('../models/FormDataModel');
// Importing the model
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Function to get all formData
const getFormData = catchAsync(async (req, res, next) => {
  let { lang } = req.query

  let formData
  if (lang === 'both') {
    formData = await FormDataModel.find();
  } else {
    const unselectedLang = lang === 'ar' ? 'en' : 'ar'
    formData = await FormDataModel.find().select(`-${unselectedLang}`);
  }
  res.status(200).json({
    success: true,
    body: { formData },
  });
});

// Function to create a formData
const createFormData = catchAsync(async (req, res, next) => {
  const isFromDataExists = await FormDataModel.findOne({order:req.body.order});
  console.log()
  const formData = await FormDataModel.findByIdAndUpdate(isFromDataExists,req.body,{upsert:true})


  res.status(201).json({
    success: true,
    body: { formData },
  });
});

// Function to update a formData
const updateFormData = catchAsync(async (req, res, next) => {
  const { formDataId } = req.params

  const formData = await FormDataModel.findByIdAndUpdate(formDataId, req.body, { new: true, runValidators: true });
  if (!formData) return next(new AppError('Not Found', 404));

  res.status(200).json({
    success: true,
    body: { formData },
  });
});

// Function to delete a formData
const deleteFormData = catchAsync(async (req, res, next) => {
  const { formDataId } = req.params
  let formData = await FormDataModel.findByIdAndDelete(formDataId);
  if (!formData) return next(new AppError('Not Found', 404));

  res.status(200).json({
    success: true,
    body: { formData },
  });
});

module.exports = {
  getFormData,
  createFormData,
  updateFormData,
  deleteFormData,
};
