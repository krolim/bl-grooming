'use strict'
/* eslint-disable no-undef */
const retrieve = (url, cb) => {
  // console.log('URL ->>>', url);
  return fetch(url, {
    accept: "application/json",
    credentials: 'include'
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb)
    .catch((e) => { 
      console.log(e);
      cb(undefined, e);
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
    .then(parseText)
    .then(cb)
    .catch((e) => { 
      console.log('fetch error >>>>>>>',e);
      cb(undefined, e);
    });
};

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300)
    return response;
  const error = 
    { 
      text: `HTTP Error ${response.statusText}`,
      statusCode: response.status,
      body: parseText(response)
    }
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  return response.json();
}

function parseText(response) {
  return response.text();
}

const Client = { retrieve, post };

export default Client;