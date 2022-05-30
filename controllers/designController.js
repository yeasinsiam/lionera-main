'use strict';

const DesignModel = require('../models/designModel');
// Importing the model
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Function to get all designs
// const getDesigns = catchAsync(async (req, res, next) => {
//   const { occasion } = req.query
//   console.log(occasion);
//   const designs = await DesignModel.find(occasion != undefined ? { occasion: occasion } : null);
//   res.status(200).json({
//     success: true,
//     body: { designs },
//   });
// });

// Function to get all designs
const getDesigns = catchAsync(async (req, res, next) => {
  const { occasion, lang } = req.query;

  let query = { lang: ['both'] };
  if (occasion) query.occasion = occasion;

  let unselectedLang = '';
  if (lang && lang !== 'both') {
    unselectedLang = lang === 'ar' ? '-en' : '-ar';
    query.lang.push(lang);
  }

  const designs = await DesignModel.find(query).populate('occasion');

  res.status(200).json({
    success: true,
    body: { designs },
  });
});

// Function to get  design by ID
const getDesignById = catchAsync(async (req, res, next) => {
  const design = await DesignModel.findById(req.params.designId).populate(
    'occasion',
  );
  if (!design) return next(new AppError('Not Found', 404));
  res.status(200).json({
    success: true,
    body: { design },
  });
});

// Function to create a design
const createDesign = catchAsync(async (req, res, next) => {
  const newDesign = new DesignModel(req.body);
  const design = await newDesign.save();

  res.status(201).json({
    success: true,
    body: { design },
  });
});

// Function to update a design
const updateDesign = catchAsync(async (req, res, next) => {
  const design = await DesignModel.findByIdAndUpdate(
    req.params.designId,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );
  if (!design) return next(new AppError('Not Found', 404));

  res.status(200).json({
    success: true,
  });
});

// Function to add a design
const addDesignToGallery = catchAsync(async (req, res, next) => {
  const { designId } = req.params;

  const design = await DesignModel.findById(designId);
  if (!design) return next(new AppError('Not Found', 404));

  design.gallery.push(req.body);
  await design.save();

  res.status(200).json({
    success: true,
    body: { design },
    req: req.body,
  });
});

// Function to remove a design
const removeDesignFromGallery = catchAsync(async (req, res, next) => {
  const { designId, galleryId } = req.params;

  const design = await DesignModel.findById(designId);
  if (!design) return next(new AppError('Not Found', 404));

  design.gallery.pull(galleryId);
  await design.save();

  res.status(200).json({
    success: true,
    body: { design },
  });
});

// Function to delete a design
const deleteDesign = catchAsync(async (req, res, next) => {
  const { designId } = req.params;
  let design = await DesignModel.findByIdAndDelete(designId);
  if (!design) return next(new AppError('Not Found', 404));

  res.status(200).json({
    success: true,
    body: { design },
  });
});

module.exports = {
  getDesigns,
  createDesign,
  addDesignToGallery,
  removeDesignFromGallery,
  deleteDesign,
  updateDesign,
  getDesignById,
};
