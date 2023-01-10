const express = require("express");
const status = require("http-status");
const Authentication = require("./Authentication");
const Movie = require("./movie");
const User = require("./user");
const Booking = require("./Booking");
module.exports = function () {
  const api = express();

  api.use("/authentication", Authentication());
  api.use("/movie", Movie());
  api.use("/booking", Booking());
  api.use("/user", User());
  api.get("*", (req, res) => {
    res.json({ error: "invalid api" });
  });

  return api;
};
