import React, { Component } from 'react';
import './App.css';

class App extends Component {
  retrieveVoters() {
    return [ 
      { avatar: "erata.jpg", name: "Erata" },
      { avatar: "Batman.png", name: "Batmana" }
    ];
  }
  
  render() {
    return (
      <div className="App">
        <h1>Grooming</h1>
        <VoterQueue voters={ this.retrieveVoters() }/>
      </div>
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

export default App;
