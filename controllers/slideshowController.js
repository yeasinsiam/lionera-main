'use strict';

const SlideshowModel = require('../models/slideshowModel');
// Importing the model
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Function to get all slideshows
// const getSlideshows = catchAsync(async (req, res, next) => {
//   let { lang} = req.query
//   let unselectedLang = lang === 'ar' ? 'en' : 'ar'

//   const slideshows = await SlideshowModel.find(req.query.package!==undefined?{package:req.query.package}:null).select(`-${unselectedLang}`);

//   res.status(200).json({
//     success: true,
//     body: { slideshows }
//   });
// });

const getSlideshows = catchAsync(async (req, res, next) => {
  const { lang, package: packageData } = req.query;

  let query = { lang: ['both'] };
  // if (lang) query.lang.push(lang)
  if (packageData) query.package = packageData;

  let unselectedLang = '';
  if (lang && lang !== 'both') {
    unselectedLang = lang === 'ar' ? '-en' : '-ar';
    query.lang.push(lang);
  }

  const slideshows = await SlideshowModel.find(query)
    .select(unselectedLang)
    .populate('package', unselectedLang);

  res.status(200).json({
    success: true,
    body: { slideshows },
  });
});

const getSlideshowById = catchAsync(async (req, res, next) => {
  const { lang } = req.query;
  const { slideshowId } = req.params;

  let slideshow;
  if (lang === 'both') {
    slideshow = await SlideshowModel.findById(slideshowId);
  } else {
    const unselectedLang = lang === 'ar' ? 'en' : 'ar';
    slideshow = await SlideshowModel.findById(slideshowId).select(
      `-${unselectedLang}`,
    );
  }

  if (!slideshow) return next(new AppError('Not Found', 404));

  res.status(200).json({
    success: true,
    body: { slideshow },
  });
});

// Function to create a slideshow
const createSlideshow = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const newSlideshow = new SlideshowModel(req.body);
  const slideshow = await newSlideshow.save();

  res.status(201).json({
    success: true,
    body: { slideshow },
  });
});

// Function to update a slideshow
const updateSlideshow = catchAsync(async (req, res, next) => {
  const { slideshowId } = req.params;

  const slideshow = await SlideshowModel.findByIdAndUpdate(
    slideshowId,
    req.body,
    { new: true, runValidators: true },
  );
  if (!slideshow) return next(new AppError('Not Found', 404));

  res.status(200).json({
    success: true,
    body: { slideshow },
  });
});

// Function to delete a slideshow
const deleteSlideshow = catchAsync(async (req, res, next) => {
  const { slideshowId } = req.params;
  let slideshow = await SlideshowModel.findByIdAndDelete(slideshowId);
  if (!slideshow) return next(new AppError('Not Found', 404));

  res.status(200).json({
    success: true,
    body: { slideshow },
  });
});

module.exports = {
  getSlideshows,
  getSlideshowById,
  createSlideshow,
  updateSlideshow,
  deleteSlideshow,
};
