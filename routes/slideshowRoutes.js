'use strict';

const { createSlideshow, getSlideshows, updateSlideshow, deleteSlideshow, getSlideshowById } = require('../controllers/slideshowController');

// Importing the express router
const slideshowRouter = require('express').Router();

// Setting up the routes
slideshowRouter.route('/')
    .post(createSlideshow)
    .get(getSlideshows)

slideshowRouter.route('/:slideshowId')
    .get(getSlideshowById)
    .put(updateSlideshow)
    .delete(deleteSlideshow)

module.exports = slideshowRouter;
