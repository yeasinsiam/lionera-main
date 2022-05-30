'use strict';

const { createOccasion, getOccasions, updateOccasion, deleteOccasion,getOccasionsById } = require('../controllers/occasionController');

// Importing the express router
const occasionRouter = require('express').Router();

// Setting up the routes
occasionRouter.route('/')
    .post(createOccasion)
    .get(getOccasions)

occasionRouter.route('/:occasionId')
    .get(getOccasionsById)
    .put(updateOccasion)
    .delete(deleteOccasion)

module.exports = occasionRouter;
