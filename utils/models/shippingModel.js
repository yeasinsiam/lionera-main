'use strict';

// Importing mongoose and Schema
const mongoose = require('mongoose');
const modifyResponseByLanguage = require('../utils/changeResponse');
const Schema = mongoose.Schema;
const validator = require('validator');

// Parent Schema
const shippingSchema = new Schema({

  name: {
    type: String,
    trim: true,
    required: true
  },

  email: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please enter a valid email',
    },
  },

  phone: {
    type: String,
    trim: true,
    required: true
  },

  address: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
  },

  city: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
  },

  state: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,

  },

  zip_code: {
    type: Number,
    trim: true,
    required: true,

  },

  country: {
    type: String,
    trim: true,
    lowercase: true,
    required: true
  }
}, {
  timestamps: true
})

shippingSchema.methods.toJSON = function () {
  const shipping = this;
  let shippingObject = shipping.toObject();

  shippingObject = modifyResponseByLanguage(shippingObject)

  return shippingObject;
}

// Creating model from a Schema
const ShippingModel = mongoose.model('Shipping', shippingSchema);

module.exports = ShippingModel;
