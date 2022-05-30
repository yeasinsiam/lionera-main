'use strict';

const { createFormData, getFormData,getSingleFormData, updateFormData, deleteFormData, } = require('../controllers/formDataController');

// Importing the express router
const formDataRouter = require('express').Router();

// Setting up the routes
formDataRouter.route('/')
    .post(createFormData)
    .get(getFormData)

formDataRouter.route('/:formId')
    .get(getSingleFormData)
    .put(updateFormData)
    .delete(deleteFormData)

module.exports = formDataRouter;
