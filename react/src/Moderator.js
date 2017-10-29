import React, { Component } from 'react';
import './App.css';
import Client from "./Client";
import { Link } from 'react-router-dom'

class Moderator extends Component {
  state = {
    voters: [] 
  };

  constructor(props) {
    super(props);
    this.retrieveVoters();
  } 

  componentDidMount() {
    this.interval = setInterval(this.retrieveVoters.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  retrieveVoters() {
    console.log('retrieve');
    Client.retrieve(data => {
      this.setState({ voters: data});
    });
  }

  render() {
    return (
      <VoterQueue voters={this.state.voters}  />
    );
  }
}

function VoterQueue(props) {
  let voters = [];
  for (let voter of props.voters)
    voters.push(<Voter avatar={ voter.avatar } name={ voter. name } />)
  return (
    <div className="Voter-queue">
      { voters };
    </div>
  );
}

function Voter(props) {
  let avatar = '/avatars/' + props.avatar;
  return (
    <span className="Participant">
      <img className="Participant-avatar" src={ avatar } alt={ props.name } />
      <footer className="Participant-name">{ props.name }</footer>
    </span>
  );
}

export default Moderator;
