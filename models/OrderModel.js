'use strict';

// Importing mongoose and Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator').default;

// child Schema
const shippingSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
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

    areaCode: {
      type: String,
      trim: true,
      required: true,
    },

    phone: {
      type: String,
      trim: true,
      required: true,
      // validate: {
      //   validator: function (value) {
      //     return validator.default.isMobilePhone(value, ['ar-AE', 'bn-BD'])
      //   },
      //   message: 'Please enter a valid phone number'
      // }
    },

    addressLine1: {
      type: String,
      trim: true,
      lowercase: true,
    },

    addressLine2: {
      type: String,
      trim: true,
      lowercase: true,
    },

    city: {
      type: String,
      trim: true,
      lowercase: true,
    },

    state: {
      type: String,
      trim: true,
      lowercase: true,
    },

    zip: {
      type: Number,
      trim: true,
    },

    country: {
      type: String,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
    _id: false,
  },
);

// Creating a schema
const orderSchema = new Schema(
  {
    lang: {
      type: String,
      trim: true,
      required: true,
    },

    financial_status: {
      type: String,
      trim: true,
      enum: ['paid', 'unpaid'],
      default: 'unpaid',
    },

    order_status: {
      type: String,
      trim: true,
      enum: ['delivered', 'pending', 'canceled', 'refund'],
      default: 'pending',
    },

    occasion: {
      type: Schema.Types.ObjectId,
      ref: 'Occasion',
      trim: true,
      required: [true, 'Please Enter Occasion'],
    },

    design: {
      type: Schema.Types.ObjectId,
      ref: 'Design',
      trim: true,
      required: [true, 'Please Enter Design'],
    },

    slideshow: {
      type: Schema.Types.ObjectId,
      ref: 'Slideshow',
      trim: true,
      required: [true, 'Please Enter Slideshow'],
    },

    package: {
      type: Schema.Types.ObjectId,
      ref: 'Package',
      trim: true,
      required: [true, 'Please Enter Package'],
    },

    addons: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Addon',
        trim: true,
        required: [true, 'Please Enter Package'],
      },
    ],

    shipping: {
      type: shippingSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Creating model from a Schema
const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;
