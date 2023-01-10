const express = require("express");
const status = require("http-status");
const UserSchema = require("../../Schemas/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = function Authentication() {
  const api = express.Router();

  api.post("/", async function (req, res) {
    const data = req.body;
    const email = data.email;
    const user = data.user;
    const password = data.password;
    const phone = data.phone;

    if (!email || !user || !password || !phone) {
      return res
        .status(status.NOT_FOUND)
        .json({ error: "email ,phone, password & user is compulsary" });
    }
    const existingUser = await UserSchema.findOne({ email: email });
    if (existingUser) {
      return res
        .status(status.NOT_FOUND)
        .json({ error: "user is already exist" });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    data.password = encryptedPassword;
    const create = await UserSchema.create(data);

    return res.status(status.OK).json({
      create,
      token: await jwt.sign(
        { ...create, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
        "user"
      ),
    });
  });

  api.post("/log", async function (req, res) {
    try {
      const loginData = req.body;

      const email = loginData.email;
      const password = loginData.password;
      let verified;
      let existingUser = await UserSchema.findOne({ email: email });

      if (!existingUser) {
        return res
          .status(status.NOT_FOUND)
          .json({ error: "User doesn't exist" });
      }
      verified = await bcrypt.compare(password, existingUser.password);

      if (!existingUser || !verified) {
        return res
          .status(status.NOT_FOUND)
          .json({ error: "Password or email is invalid" });
      }
      return res.status(status.OK).json({ response: "Sucess" });
    } catch (error) {
      return res.status(status.NOT_FOUND).json({ error: error });
    }
  });
  api.get("*", (req, res) => {
    res.status(status.NOT_FOUND).json({ error: "invalid api" });
  });

  return api;
};
