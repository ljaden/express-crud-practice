const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "<name is required>"],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, "<Duration is required>"],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "<Group size is required>"],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    defualt: 0,
  },
  price: {
    type: Number,
    required: [true, "<Price is required>"],
  },
  priceDiscount: {
    type: Number,
  },
  summary: {
    type: String,
    trim: true,
    required: [true, "<Summary is required>"],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, "<ImageCover is required>"],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});

// model
const Tour = mongoose.model("Tour", tourSchema);

// export Tour model
module.exports = Tour;
