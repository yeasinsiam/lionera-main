'use strict';

const {
  createDesign,
  getDesigns,
  addDesignToGallery,
  removeDesignFromGallery,
  deleteDesign,
  updateDesign,
  getDesignById,
} = require('../controllers/designController');

// Importing the express router
const designRouter = require('express').Router();

// Setting up the routes
designRouter.route('/').get(getDesigns).post(createDesign);

designRouter
  .route('/:designId')
  .get(getDesignById)
  .delete(deleteDesign)
  .put(updateDesign);

designRouter.route('/:designId/add').put(addDesignToGallery);

designRouter.route('/:designId/remove/:galleryId').put(removeDesignFromGallery);

module.exports = designRouter;
