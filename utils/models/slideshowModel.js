'use strict';

// Importing mongoose and Schema
const mongoose = require('mongoose');
const modifyResponseByLanguage = require('../utils/changeResponse');
const Schema = mongoose.Schema;

// Parent Schema
const slideshowSchema = new Schema(
  {
    package: {
      type: Schema.Types.ObjectId,
      ref: 'Package',
      required: [true, 'Please Enter Package'],
    },

    occasion: {
      type: Schema.Types.ObjectId,
      ref: 'Occasion',
      trim: true,
      required: [true, 'Please Enter Occasion'],
    },

    URL: {
      type: String,
      required: true,
    },

    lang: {
      type: String,
      enum: ['en', 'ar', 'both'],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

slideshowSchema.methods.toJSON = function () {
  const slideshow = this;
  let slideshowObject = slideshow.toObject();

  slideshowObject = modifyResponseByLanguage(slideshowObject);

  return slideshowObject;
};

// Creating model from a Schema
const SlideshowModel = mongoose.model('Slideshow', slideshowSchema);

module.exports = SlideshowModel;
