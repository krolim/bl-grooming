'use strict'

const avatarsMap = new Map();
const voters = new Map();

const join = (user) => {
  if (!user.name || !user.avatar) 
    return 'Bad request: Missing name or avatar';
  if (voters.get(user.name))
    return "User already joined";
  const avatarMapping = avatarsMap.get(user.avatar); 
  if (avatarMapping && avatarMapping != user.name) {
    return "Avatar already in use";
  }
  voters.set(user.name, {user: user, vote: 0});
  avatarsMap.set(user.avatar, user.name);
  console.log(voters);
  return;
}

const vote = (user, vote) => {
  voters.set(user.name, { user: user, vote: vote });
}

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
}

module.exports.join = join;
module.exports.vote = vote;
module.exports.getVoters = getVoters;
module.exports.newVote = newVote;