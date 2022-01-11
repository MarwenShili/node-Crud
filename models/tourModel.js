const mongoose = require('mongoose');

//SCHEMA OF DATA
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  duration: {
    type: Number,
    required: [true, 'Atour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'Atour must have a groupe size'],
  },
  difficulty: {
    type: String,
    required: [true, 'Atour must have a difficulty'],
  },
  ratingAverage: { type: Number, default: 4.5 },
  ratingQuantity: { type: Number, default: 0 },
  price: { type: Number, required: [true, 'A tour must have a price'] },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'a tour must have a description'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'a tour must have a image cover '],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});
//MODEL SCHEMA
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
