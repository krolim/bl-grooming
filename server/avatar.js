'use strict'

const fs = require('fs');

const avatars = [];

fs.readdir('public/avatars', (err, files) => {
  files.forEach(file => {
    const loc = '/public/avatars/' + file;
    const avatar = {
      name: file,
      src: loc,
      thumbnail: loc,
      thumbnailWidth: 100,
      thumbnailHeight: 100  
    }
    avatars.push(avatar);
  });
});

module.exports.allAvatars = () => {
  return avatars;
};