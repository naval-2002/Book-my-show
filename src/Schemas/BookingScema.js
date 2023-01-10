const mongoose = require("mongoose");
const schem = mongoose.Schema;

const Booking = mongoose.Schema({
  bookingId: {
    type: schem.Types.ObjectId,
  },

  movieId: {
    type: String,
  },
  ticketQty: {
    type: Number,
  },
  totalamt: {
    type: Number,
  },
});
module.exports = mongoose.model("Booking Data", Booking);
