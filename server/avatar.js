'use strict'

const fs = require('fs');

const avatars = [];

fs.readdir('public/avatars', (err, files) => {
  files.forEach(file => {
    const loc = '/avatars/' + file;
    const avatar = {
      src: loc,
      thumbnail: loc,
      thumbnailWidth: 50,
      thumbnailHeight: 50  
    }
    avatars.push(avatar);
  });
  console.log(avatars);
});

module.exports.allAvatars = () => {
  return avatars;
};