'use strict'

const avatarsMap = new Map();
const voters = new Map();
let open = true;

const join = (user) => {
  if (!user.name || !user.avatar) 
    return ['Bad request: Missing name or avatar', 400];
  // if (voters.get(user.name))
  //   return ["User already joined", 200];
  const avatarMapping = avatarsMap.get(user.avatar); 
  if (avatarMapping && avatarMapping != user.name) {
    return ["Avatar already in use", 401];
  }
  voters.set(user.name, {user: user, vote: 0});
  avatarsMap.set(user.avatar, user.name);
  console.log(voters);
  return ['OK', 200];
}

const vote = (user, vote) => {
  voters.set(user.name, { user: user, vote: vote });
}

const close = () => open = false;

const isOpen = () => open;

const getVoters = () => {
  const results = [];
  voters.forEach((value, key) => {
    results.push({
      name: value.user.name,
      status: value.vote === 0?'joined':'voted',
      vote: value.vote,
      avatar: value.user.avatar
    });
  }); 
  return results;
}

const newVote = (user) => {
  voters.clear();
  open = true;
}

module.exports.join = join;
module.exports.vote = vote;
module.exports.getVoters = getVoters;
module.exports.newVote = newVote;
module.exports.closeVote = close;
module.exports.isOpen = isOpen;
