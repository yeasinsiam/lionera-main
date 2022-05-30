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

    label: {
      type: String,
      trim: true,
      required: [true, 'Please Enter Label'],
    },
  },
  {
    _id: false,
  },
);

// Creating a schema
const formSchema = new Schema(
  {
    en: {
      type: subSchema,
      required: true,
    },

    ar: {
      type: subSchema,
      required: true,
    },

    inputType: {
      type: String,
      trim: true,
      required: [true, 'Please Enter Input-Type'],
    },
    lang: String,

    package: {
      type: Schema.Types.ObjectId,
      ref: 'Package',
      trim: true,
      required: [true, 'Please Enter Package'],
    },
  },
  {
    timestamps: true,
  },
);

formSchema.methods.toJSON = function () {
  const form = this;
  let formObject = form.toObject();

  formObject = modifyResponseByLanguage(formObject);

  return formObject;
};

// Creating model from a Schema
const FormModel = mongoose.model('Form', formSchema);

module.exports = FormModel;
