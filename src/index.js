const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
require("./database/db");
const routes = require("./routes");

const app = express();

app.use(cors());
app.use(bodyparser());

app.use("/api/v1", routes());

const port = 200;
app.listen(port, (req, res) => {
  console.log("connected sucessfully");
});
