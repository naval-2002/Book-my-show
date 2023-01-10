const express = require("express");
const status = require("http-status");
const { isValidObjectId } = require("mongoose");
const Movie = require("../../Schemas/Movieschema");
const userSchema = require("../../Schemas/userSchema");
const MovieMiddleware = require("../../middleware/movieMiddleware");
const jwt = require("jsonwebtoken");
const uploads = require("../../multer");
const cloundnary = require("../../cloudinary");
const fs = require("fs");
module.exports = function () {
  const api = express.Router();

  api.post("/", uploads.single("images"), async function (req, res) {
    try {
      const { path } = req.file;

      async function Upload(path) {
        return await cloundnary.Uploads(path, "book my show");
      }
      const response = await Upload(path);

      let movieData = req.body;
      movieData.url = response;
      fs.unlinkSync(path);
      if (!movieData) {
        return res
          .status(status.NOT_FOUND)
          .json({ error: "Movie data is not avilable" });
      }

      const post = await Movie.create(movieData);
      return res.status(status.OK).json({
        response: post,
        token: await jwt.sign(
          { ...post, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
          "movie"
        ),
      });
    } catch (error) {
      res.json({ error: "hello" });
    }
  });

  api.use(MovieMiddleware());

  api.get("/getAll", async function (req, res) {
    const movieData = await Movie.find();
    res.status(status.OK).json({ movieData });
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
      if (!UserData) {
        return res
          .status(status.NOT_FOUND)
          .json({ error: "User Data is not Avaliable" });
      }
      return res.status(status.OK).json({ UserData });
    } catch (error) {
      res.status(status.NOT_FOUND).json({ error: error });
    }
  });

  api.put("/:id", async function (req, res) {
    try {
      const updateData = req.body;
      const id = req.params.id;
      if (!id) {
        return res
          .status(status.NOT_FOUND)
          .json({ error: "id is not avilable" });
      }
      if (!isValidObjectId(id)) {
        return res.status(status.NOT_FOUND).json({ error: "id is invalid" });
      }
      const existingMovie = await Movie.findById(id);
      if (!existingMovie) {
        return res
          .status(status.NOT_FOUND)
          .json({ error: "This id is not avilable" });
      }

      let update = await Movie.findByIdAndUpdate(id, updateData, { new: true });

      return res.status(status.OK).json(update);
    } catch (error) {
      res.json({ error });
    }
  });

  api.delete("/delete/:id", async function (req, res) {
    const id = req.params.id;
    if (!id) {
      return res.status(status.NOT_FOUND).json({ error: "Id is not avilable" });
    }
    if (!isValidObjectId) {
      return res.status(status.NOT_FOUND).json({ error: "id is invalid" });
    }
    const deleteMovie = await userSchema.findByIdAndDelete(id);
    return res.status(status.OK).json({ deleteMovie });
  });

  return api;
};
