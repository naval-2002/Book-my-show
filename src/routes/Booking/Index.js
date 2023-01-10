const express = require("express");
const BookingMiddleware = require("../../middleware/bookingMiddleware");
const status = require("http-status");
const { isValidObjectId } = require("mongoose");
const BookingData = require("../../Schemas/BookingScema");
const movieData = require("../../Schemas/Movieschema");
const jwt = require("jsonwebtoken");

const EmailService = require('../../email')


module.exports = function () {
  const api = express.Router();
  api.post("/", async function (req, res) {
    try {
      let Bookingdata = req.body;
      if (!Bookingdata) {
        res
          .status(status.NOT_FOUND)
          .json({ error: "Booking Data is not avilable" });
      }
      const movie = await movieData.findById(Bookingdata.movieId);
      console.log(movie);
      if (!movie) {
        return res
          .status(status.NOT_FOUND)
          .json({ error: "movieId is not avilable" });
      }
      const total = Bookingdata.ticketQty * movie.amount;
      console.log(total);
      Bookingdata.totalamt = total;
      console.log(Bookingdata.totalamt);

      let result = await BookingData.create(Bookingdata);
      console.log(result);

      return res.status(status.OK).json({
        result,
        token: await jwt.sign(
          { ...result, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
          "book"
        ),
      });
    } catch (error) {
      res.status(status.NOT_FOUND).json({ error: error });
    }
  });
  api.use(BookingMiddleware());
  api.get("/getAll", async function (req, res) {
    let bookingdata = await BookingData.find({});
    res.status(status.OK).json({ bookingdata });
  });

  api.get("/:id", async function (req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res
          .status(status.NOT_FOUND)
          .json({ error: "Id is not avilable" });
      }
      if (!isValidObjectId(id)) {
        return res.status(status.NOT_FOUND).json({ error: "Id is not valid" });
      }
      const UserData = await User.findById(id);
      return res.status(status.OK).json({ UserData });
    } catch (error) {
      res.status(status.NOT_FOUND).json({ error: error });
    }
  });

  api.put("/update/:id", async function (req, res) {
    try {
      const updateData = req.body;
      const id = req.params.id;
      if (!isValidObjectId(id)) {
        return res.status(status.NOT_FOUND).json({ error: "id is invalid" });
      }
      const existingBooking = await BookingData.findById(id);
      if (!existingBooking) {
        return res
          .status(status.NOT_FOUND)
          .json({ error: "This id is not avilable" });
      }

      let update = await BookingData.findByIdAndUpdate(id, updateData, {
        new: true,
      });

      return res.status(status.OK).json(update);
    } catch (error) {
      res.json({ error });
    }
  });

  api.delete("/delete/:id", async function (req, res) {
    try {
      const id = req.params.id;
      if (!isValidObjectId(id)) {
        return res.status(status.NOT_FOUND).json({ error: "Id is not valid" });
      }
      if (!id) {
        return res
          .status(status.NOT_FOUND)
          .json({ error: "Id is not avilable" });
      }
      const remove = await BookingData.findByIdAndDelete(id);
      return res.status(status.OK).json({ remove });
    } catch (error) {
      return res.status(status.NOT_FOUND).json({ error });
    }
  });

  return api;
};
