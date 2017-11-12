'use strict'
/* eslint-disable no-undef */
const retrieve = (url, cb) => {
  console.log('URL ->>>', url);
  return fetch(url, {
    accept: "application/json",
    credentials: 'include'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
    .catch((e) => { 
      console.log(e);
    });
};

const post = (url, method, body, cb) => {
  return fetch(url, {
    method: method,
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)})
    .then(checkStatus)
    .then(cb)
    .catch((e) => { 
      console.log('>>>>>>>',e);
      cb(null, e);
    });
};

function checkStatus(response) {
  console.log(response);
  if (response.status >= 200 && response.status < 300)
    return response;
  // if (response.status === 401)
  //   return window.location = '/reg'; 
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  return response.json();
}

const Client = { retrieve, post };
export default Client;