const cloundnary = require("cloudinary").v2;
require("dotenv").config();

const Cloud_Name = process.env.CLOUD_NAME;
const Cloud_Api = "818386724427242";
const Cloud_Api_Secret = "W4wbVaPojddzDuGc6mSEobgtQlc";

cloundnary.config({
  cloud_name: Cloud_Name,
  api_key: Cloud_Api,
  api_secret: Cloud_Api_Secret,
});

exports.Uploads = async function (file, folder) {
  try {
    console.log(Cloud_Name, "cloud");
    const result = await cloundnary.uploader.upload(file, { folder });
    console.log(result);
    return result.secure_url;
  } catch (error) {
    console.log({ error });
  }
};
