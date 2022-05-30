'use strict';

// Importing mongoose and Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating a schema
const designSchema = new Schema({
  occasion: {
    type: Schema.Types.ObjectId,
    ref: 'Occasion',
    trim: true,
    required: [true, 'Please Enter Occasion']
  },

  gallery: [{
    url: {
      type: String,
      trim: true,
      required: [true, 'Please Enter a URL']
    },
    uid:{
      type:Number,
      default:Math.random()
    }
  }],

  lang: {
    type: String,
    enum: ['en', 'ar', 'both'],
    required: true
  },

}, {
  timestamps: true
});

// Creating model from a Schema
const DesignModel = mongoose.model('Design', designSchema);

module.exports = DesignModel;
