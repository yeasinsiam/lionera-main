'use strict';

const { createForm, getForms, updateForm, deleteForm } = require('../controllers/formController');

// Importing the express router
const formRouter = require('express').Router();

// Setting up the routes
formRouter.route('/')
    .post(createForm)
    .get(getForms)

formRouter.route('/:formId')
    .put(updateForm)
    .delete(deleteForm)

module.exports = formRouter;
