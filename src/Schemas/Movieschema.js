const mongoose = require("mongoose");

const MovieSchema = mongoose.Schema({
  movieName: {
    type: String,
  },
  genra: {
    type: String,
  },
  url: {
    type: String,
  },
  amount: {
    type: Number,
  },
});
module.exports = mongoose.model("Movie Data", MovieSchema);
