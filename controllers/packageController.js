'use strict';

const PackageModel = require('../models/packageModel');
// Importing the model
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Function to get all packages
const getPackages = catchAsync(async (req, res, next) => {
  let { lang } = req.query;

  let unselectedLang = '';
  if (lang && lang !== 'both') unselectedLang = lang === 'ar' ? '-en' : '-ar';
  if (lang === 'both') {
    unselectedLang = '-ar';
  }

  let query = { lang: ['both'] };
  if (lang && lang !== 'both') {
    unselectedLang = lang === 'ar' ? '-en' : '-ar';
    query.lang.push(lang);
  }

  const packages = await PackageModel.find(query)
    .select(unselectedLang)
    .populate('occasion');

  res.status(200).json({
    success: true,
    body: { packages },
  });
});

const getPackageById = catchAsync(async (req, res, next) => {
  const { lang } = req.query;
  const { packageId } = req.params;

  let packageData;
  if (lang === 'both') {
    packageData = await PackageModel.findById(packageId);
  } else {
    const unselectedLang = lang === 'ar' ? 'en' : 'ar';
    packageData = await PackageModel.findById(packageId).select(
      `-${unselectedLang}`,
    );
  }

  if (!packageData) return next(new AppError('Not Found', 404));

  res.status(200).json({
    success: true,
    body: { package: packageData },
  });
});

// Function to add a package
const addBenefitToPackage = catchAsync(async (req, res, next) => {
  const { packageId } = req.params;
  let { benefitLang } = req.params;

  const packageData = await PackageModel.findById(packageId);
  if (!packageData) return next(new AppError('Not Found', 404));

  benefitLang = benefitLang === 'ar' ? 'ar' : 'en';

  packageData[benefitLang].benefits.push(req.body);
  await packageData.save();

  res.status(200).json({
    success: true,
    body: { package: packageData },
  });
});

// Function to remove a package
const removeBenefitFromPackage = catchAsync(async (req, res, next) => {
  const { packageId, benefitId } = req.params;
  console.log(req.params);
  const packageData = await PackageModel.findById(packageId);
  if (!packageData) return next(new AppError('Not Found', 404));

  await packageData.en.benefits.pull(benefitId);
  await packageData.ar.benefits.pull(benefitId);
  await packageData.save();

  res.status(200).json({
    success: true,
    body: { package: packageData },
  });
});

// Function to create a package
const createPackage = catchAsync(async (req, res, next) => {
  const newPackage = new PackageModel(req.body);
  const packageData = await newPackage.save();

  res.status(201).json({
    success: true,
    body: { package: packageData },
  });
});

// Function to update a package
const updatePackage = catchAsync(async (req, res, next) => {
  const { packageId } = req.params;

  const packageData = await PackageModel.findByIdAndUpdate(
    packageId,
    req.body,
    { new: true, runValidators: true },
  );
  if (!packageData) return next(new AppError('Not Found', 404));

  res.status(200).json({
    success: true,
    body: { package: packageData },
  });
});

// Function to delete a package
const deletePackage = catchAsync(async (req, res, next) => {
  const { packageId } = req.params;
  let packageData = await PackageModel.findByIdAndDelete(packageId);
  if (!packageData) return next(new AppError('Not Found', 404));

  res.status(200).json({
    success: true,
    body: { package: packageData },
  });
});

module.exports = {
  getPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage,
  addBenefitToPackage,
  removeBenefitFromPackage,
};
