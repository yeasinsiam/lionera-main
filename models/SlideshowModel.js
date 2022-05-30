'use strict';

// Importing mongoose and Schema
const mongoose = require('mongoose');
const modifyResponseByLanguage = require('../utils/changeResponse');
const Schema = mongoose.Schema;

// Child schema
const subSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Please Enter Title'],
    },
  },
  {
    _id: false,
  },
);

// Parent Schema
const slideshowSchema = new Schema(
  {
    en: {
      type: subSchema,
    },

    ar: {
      type: subSchema,
    },
    occasion: {
      type: Schema.Types.ObjectId,
      ref: 'Occasion',
      trim: true,
      required: [true, 'Please Enter Occasion'],
    },

    package: {
      type: Schema.Types.ObjectId,
      ref: 'Package',
      required: [true, 'Please Enter Package'],
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
