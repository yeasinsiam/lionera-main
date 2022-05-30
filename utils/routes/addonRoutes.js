'use strict';

const { createAddon, getAddons, getAddonById, updateAddon, deleteAddon } = require('../controllers/addonController');

// Importing the express router
const addonRouter = require('express').Router();

// Setting up the routes
addonRouter.route('/')
    .post(createAddon)
    .get(getAddons)

addonRouter.route('/:addonId')
    .get(getAddonById)
    .put(updateAddon)
    .delete(deleteAddon)

module.exports = addonRouter;
