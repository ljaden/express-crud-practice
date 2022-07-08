const mongoose = require("mongoose");

try {
  mongoose.connect(process.env.DB_URI, () => {
    console.log("Connected to Database");
  });
} catch (error) {
  console.log(error);
}

module.exports = mongoose;
