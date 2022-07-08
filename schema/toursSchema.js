const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "<name is required>"],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, "<price is required>"],
  },
});

// model
const Tour = mongoose.model("Tour", tourSchema);

// export Tour model
module.exports = Tour;
