'use strict';

// Importing mongoose and Schema
const mongoose = require('mongoose');
const modifyResponseByLanguage = require('../utils/changeResponse');
const Schema = mongoose.Schema;

// Parent Schema
const shippingAreaSchema = new Schema({

  name: {
    type: String,
    trim: true,
    required: true
  },

  price: {
   AED: {
      type: Number,
      trim: true,
      required: true
    },
  }
  
}, {
  timestamps: true
})



shippingAreaSchema.methods.toJSON = function () {
  const shipping = this;
  let shippingAreaObject = shipping.toObject();

  shippingAreaObject = modifyResponseByLanguage(shippingAreaObject)

  return shippingAreaObject;
}

// Creating model from a Schema
const ShippingAreaModel = mongoose.model('shippingArea', shippingAreaSchema);

module.exports = ShippingAreaModel;
