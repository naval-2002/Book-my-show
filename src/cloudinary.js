const { json } = require("body-parser");
require("dotenv").config();
const cloundnary = require("cloudinary").v2;

const CloudName = process.env.CloudName;

const Api_key = process.env.Api_key;
const Api_secret = process.env.Api_secret;

cloundnary.config({
  cloud_name: CloudName,
  api_key: Api_key,
  api_secret: Api_secret,
});

exports.Uploads = async function (file, folder) {
  try {
    const result = await cloundnary.uploader.upload(file, { folder });
    return result.secure_url;
  } catch (err) {
    console.log({ err });
  }
};
