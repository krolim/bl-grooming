'use strict'

const fs = require('fs');
const extend = require('underscore').extend;

const avatars = [];
const avatarsMap = new Map();

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

module.exports.allAvatars = () => avatars;

module.exports.selectAvatar = (avatarName, user) => {
  if (avatarsMap.has(avatarName))
    return avatarsMap.get(avatarName) === user;
  avatarsMap.set(avatarName, user);
  return true;
}

module.exports.freeAvatar = (avatarName) => {
  avatarsMap.delete(avatarName);
}

module.exports.getAvatars = () => {
  const result = [];
  avatars.forEach((avatar) => {
    result.push(extend(avatar, { isSelected: avatarsMap.has(avatar.name) }));
  });
  return result;
}

module.exports.reset = () => {
  avatarsMap.clear();
}