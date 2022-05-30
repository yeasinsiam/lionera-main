'use strict';

// Importing mongoose and Schema
const mongoose = require('mongoose');
const modifyResponseByLanguage = require('../utils/changeResponse');
const Schema = mongoose.Schema;

// Child schema
const subSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please Enter Title'],
  }
}, {
  _id: false
});

// Parent Schema
const occasionSchema = new Schema({
  en: {
    type: subSchema,
  },

  ar: {
    type: subSchema,
  },

  lang: {
    type: String,
    enum: ['en', 'ar', 'both'],
    required: true
  },

  thumbnails: {
    type: String,
    required: [true, 'Please Enter Thumbnails']
  }
}, {
  timestamps: true
})

occasionSchema.methods.toJSON = function () {
  const occasion = this;
  let occasionObject = occasion.toObject();

  occasionObject = modifyResponseByLanguage(occasionObject)

  return occasionObject;
}

// Creating model from a Schema
const OccasionModel = mongoose.model('Occasion', occasionSchema);

module.exports = OccasionModel;
