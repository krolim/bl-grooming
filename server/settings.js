'use strict'

const VOTER_QKIE='krolim.voter';

const getContext = (req) => {
	const context = {
    name: "",
    avatar: ""
  };
	if (req.cookies) {
		const cookie = req.cookies[VOTER_QKIE];	
    if (cookie)
      context = JSON.parse(cookie);
	}	
	return context;
}

const setContext = (resp, context) => {
  resp.cookie(VOTER_QKIE, JSON.stringify(context));
}