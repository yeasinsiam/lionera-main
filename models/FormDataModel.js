'use strict';

// Importing mongoose and Schema
const mongoose = require('mongoose');
const modifyResponseByLanguage = require('../utils/changeResponse');
const Schema = mongoose.Schema;


// Creating a schema
const formDataSchema = new Schema({

  data: {},
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    trim: true,
    unique: true,
    required: [true, 'No Order Found!']
  }

}, {
  timestamps: true
});

formDataSchema.methods.toJSON = function () {
  const form = this;
  let formObject = form.toObject();

  formObject = modifyResponseByLanguage(formObject)

  return formObject;
}

// Creating model from a Schema
const FormDataModel = mongoose.model('FormData', formDataSchema);

module.exports = FormDataModel;
