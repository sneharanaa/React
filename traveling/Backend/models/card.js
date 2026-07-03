const mongoose = require('mongoose');
const connection = require('../db');

const cardschema = mongoose.Schema({
  poster: {
    type: String,
    required: true,
  },
  placename: {
    type: String,
    required: true,
  },
  days: {
    type: Number,
    min: 3,
    max: 30,
    required: true,
  },
  mode: {
    type: String,
    enum: ['Train', 'Plane'],
    required: true,
  },
  charge: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  todate: {
    type: Date,
    required: true,
  },
  backgroundimg: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('tripdata', cardschema);
