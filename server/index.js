'use strict';

const port = process.env.PORT || 8888;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use("/public", express.static("public"));

console.log("Listening on ", port);
app.listen(port);