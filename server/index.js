'use strict';

const port = process.env.PORT || 8888;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const avatarManager = require('./avatar.js');

app.use(bodyParser.json());
app.use(cookieParser());
app.use("/public", express.static("public"));

app.get('/user-avatars', (req, resp) => {
  resp.send(avatarManager.allAvatars()).status(200);
});
console.log("Listening on ", port);
app.listen(port);