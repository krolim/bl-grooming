import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Grooming</h1>
        <VoterQueue />
      </div>
    );
  }
}

function VoterQueue(props) {
  return (
    <div className="Voter-queue">
      <Voter avatar="erata.jpg" name="Erata" />
      <Voter avatar="Batman.png" name="Batman" />
    </div>
  );
}

function Voter(props) {
  return (
    <span className="Participant">
      <img className="Participant-avatar" src= { props.avatar } />
      <footer className="Participant-name">{ props.name }</footer>
      
    </span>
  );
}

export default App;
