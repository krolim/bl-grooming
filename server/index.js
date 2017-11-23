'use strict';

const port = process.env.PORT || 8888;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const avatarManager = require('./avatar.js');
const voteManager = require('./voter.js');
const COOKIE = 'groomingAppCookie';

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/public', express.static('public'));

app.get('/user-avatars', (req, resp) => {
  resp.status(200).send(avatarManager.getAvatars());
});

app.post('/join', (req, resp) => {
  let user = req.body;
  let avatar = req.body.avatar;
  console.log('join', user, avatar);
  const cookie = req.cookies[COOKIE];
  if (cookie)
    user = JSON.parse(cookie);
  console.log('cookie', cookie);
  const result = voteManager.join(user);
  if (result[1] == 400)
    return resp.status(400).send(result[1]);
  else if (result[1] == 401)
    return resp.status(401).send(result[1]);
  if (!cookie) 
    resp.cookie(COOKIE, JSON.stringify(user));
  return resp.status(200).send(user);
});

app.post('/close', (req, resp) => {
  voteManager.closeVote();
  resp.status(200).send();
});

app.post('/vote', (req, resp) => {
  if (!voteManager.isOpen())
    return resp.status(403).send('Voting closed');
  if (!req.body.vote) 
    return resp.status(400).send();
  console.log('voted: ', req.body.vote);
  const cookie = req.cookies[COOKIE];
  if (!cookie) { 
    console.log('No cookie');
    return resp.status(401).send('Not registered');
  }
  const user = JSON.parse(cookie);
  voteManager.vote(user, req.body.vote);
  resp.status(200).send(); 
});

app.put('/new-vote', (req, resp) => {
  voteManager.newVote();
  resp.status(200).send();
});

app.get('/voters', (req, resp) => {
  resp.status(200).send(voteManager.getVoters());
});

app.post('/logout', (req, resp) => {
  const cookie = req.cookies[COOKIE];
  if (cookie) {
    const user = JSON.parse(cookie);
    voteManager.logout(user);
    resp.clearCookie(COOKIE);
  }
  
  resp.status(200).send('Logged out');
});

console.log("Listening on ", port);
app.listen(port);