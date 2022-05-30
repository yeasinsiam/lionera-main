'use strict';

const { createPackage, getPackages, updatePackage, deletePackage, getPackageById, addBenefitToPackage, removeBenefitFromPackage } = require('../controllers/packageController');

// Importing the express router
const packageRouter = require('express').Router();

// Setting up the routes
packageRouter.route('/')
    .post(createPackage)
    .get(getPackages)

packageRouter.route('/:packageId')
    .get(getPackageById)
    .put(updatePackage)
    .delete(deletePackage)

packageRouter.route('/:packageId/benefits/:benefitLang')
    .put(addBenefitToPackage)

packageRouter.route('/:packageId/benefits/remove/:benefitId')
    .put(removeBenefitFromPackage)

module.exports = packageRouter;
