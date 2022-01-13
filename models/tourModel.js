const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');

//SCHEMA OF DATA
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      maxlength: [40, 'A tour name must have less or equal then 40 characters'],
      minlength: [10, 'A tour name must have more or equal then 10 characters'],
      // validate: [validator.isAlpha, 'Tour name must only contain characters'],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'Atour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'Atour must have a groupe size'],
    },
    secretTour: {
      type: Boolean,
      default: false,
    },
    difficulty: {
      type: String,
      required: [true, 'Atour must have a difficulty'],
    },
    ratingAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    ratingQuantity: { type: Number, default: 0 },
    price: { type: Number, required: [true, 'A tour must have a price'] },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // this only points to current doc on NEW document creation
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price',
      },
    },
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
      //we cannot get the images => password for exemple
      select: false,
    },
    startDates: [Date],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
//virtual propertie => not saved in database
tourSchema.virtual('duarationWeek').get(function () {
  return this.duration / 7;
});

//DOCUMENT MIDDLEWARE => this function runs before .save()  or before .create()
tourSchema.pre('save', function (next) {
  //this contient the current document to save
  this.slug = slugify(this.name, { lower: true });
  next();
});
// tourSchema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });
//QUERY MIDDLEWARE
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  next();
});
//AGREGATION MIDDLEWARE
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});
//MODEL SCHEMA
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
