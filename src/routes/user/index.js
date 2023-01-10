const express = require("express");
const status = require("http-status");
const { isValidObjectId } = require("mongoose");
const User = require("../../Schemas/userSchema");
const myMiddleware = require("../../middleware/userMiddleware");
module.exports = function () {
  const api = express.Router();

  api.use(myMiddleware());
  api.get("/getAll", async function (req, res) {
    const UserData = await User.find({});
    return res.status(status.OK).json({ UserData });
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
      const id = req.params.id;
      const update = req.body;
      if (!id) {
        return res
          .status(status.NOT_FOUND)
          .json({ error: "id is not avilable" });
      }
      if (!isValidObjectId(id)) {
        return res.status(status.NOT_FOUND).json({ error: "id is not valid" });
      }
      const updatedUser = await User.findByIdAndUpdate(id, update, {
        new: true,
      });
      return res.status(status.OK).json({ updatedUser });
    } catch (error) {
      return res.status(status.NOT_FOUND).json({ error });
    }
  });

  api.delete("/delete/:id", async function (req, res) {
    let id = req.params.id;

    const remove = await User.findByIdAndDelete(id);
    res.json({ remove });
  });

  return api;
};
