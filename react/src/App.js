import React, { Component } from 'react';
import './App.css';
import Client from "./Client";

class App extends Component {
  state = {
    voters: [] 
  };

  constructor(props) {
    super(props);
    this.page = 'menu';
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
      <div className="App">
        <Content page={ this.page } switch={ (value) => { this.page = value } } />
      </div>
    );
  }
}

function Content(props) {
  if (props.page == 'menu') 
    return (
      <Menu switch={ props.switch }/>
    );
  else if (props.page == 'content') 
    return (
      <div className="App">
        <h1>Grooming</h1>
        <VoterQueue voters={ this.state.voters }/>
      </div>
    );
}

function Menu(props) {
  return (
    <div className="App">
      <button onClick={ () => { props.switch('content'); } }>Click me</button>
    </div>
  );
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
