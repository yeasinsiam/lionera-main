'use strict';

// Importing mongoose and Schema
const mongoose = require('mongoose');
const modifyResponseByLanguage = require('../utils/changeResponse');
const Schema = mongoose.Schema;

// Benefit Schema
const benefitSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  }
})

// Child schema
const subSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please Enter Title'],
  },
  benefits: {
    type: [benefitSchema],
    required: true
  },
}, {
  _id: false
});

// Parent Schema
const packageSchema = new Schema({
  en: {
    type: subSchema
    },

  ar: {
    type: subSchema
  },

  price: {
    USD: {
      type: Number,
      trim: true,
      required: true
    },
    AED: {
      type: Number,
      trim: true,
      required: true
    }
  },
  lang:String,
  occasion: {
    type: Schema.Types.ObjectId,
    ref: 'Occasion',
    trim: true,
    required: [true, 'Please Enter Occasion']
  },

  mostPopular: {
    type: Boolean,
    trim: true,
    default: false
  }

}, {
  timestamps: true
})

packageSchema.methods.toJSON = function () {
  const packageData = this;
  let packageObject = packageData.toObject();

  packageObject = modifyResponseByLanguage(packageObject)

  return packageObject;
}

// Creating model from a Schema
const PackageModel = mongoose.model('Package', packageSchema);

module.exports = PackageModel;
