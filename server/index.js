'use strict';

const port = process.env.PORT || 8888;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(bodyParser.json());
app.use(cookieParser());
app.use("/public", express.static("public"));

// app.get('/context', (req, resp) => {
//   return 
// });
console.log("Listening on ", port);
app.listen(port);