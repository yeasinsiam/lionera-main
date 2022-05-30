'use strict';

// Importing mongoose and Schema
const mongoose = require('mongoose');
const moment = require('moment')
const Schema = mongoose.Schema;

// Creating a schema
const userOrderDataSchema = new Schema({

  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    trim: true,
    required: [true, 'Please Enter Order']
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    trim: true,
    required: [true, 'Please Enter User']
  },

  forms: [{
    type: Schema.Types.ObjectId,
    ref: 'FormData',
    trim: true,
    required: [true, 'Please Enter FormData']
  }],

  addons: [{
    type: Schema.Types.ObjectId,
    ref: 'Addon',
    trim: true,
    required: [true, 'Please Enter Package']
  }],

  expiresAt: {
    type: Date,
    default: moment().add(1, 'days')
  }

}, {
  timestamps: true
});

// Creating model from a Schema
const UserOrderDataModel = mongoose.model('UserOrderData', userOrderDataSchema);

module.exports = UserOrderDataModel;
