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
  },

  label: {
    type: String,
    trim: true,
    required: [true, 'Please Enter Label'],
  }
}, {
  _id: false
});

// Creating a schema
const addonSchema = new Schema({
  en: {
    type: subSchema,
    required: true
  },

  ar: {
    type: subSchema,
    required: true
  },

  price: {
    type: Number,
    trim: true,
    required: [true, 'Please Enter Price'],
  },

  inputType: {
    type: String,
    trim: true,
    required: [true, 'Please Enter Input-Type'],
  },

  currency: {
    type: String,
    trim: true,
    required: [true, 'Please Enter Currency'],
  },

}, {
  timestamps: true
});

addonSchema.methods.toJSON = function () {
  const addon = this;
  let addonObject = addon.toObject();

  addonObject = modifyResponseByLanguage(addonObject)

  return addonObject;
}

// Creating model from a Schema
const AddonModel = mongoose.model('Addon', addonSchema);

module.exports = AddonModel;
