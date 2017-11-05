import React, { Component } from 'react';
import './App.css';
import Client from "./Client";
import { Panel, Image, Row, Col, Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom'

class Moderator extends Component {

  constructor(props) {
    super(props);
    this.state = {
      voters: {
        all: [],
        voted: [],
        pending: []
      },
      showVotes: false,
      votingFinished: false, 
      view: 'all'
    };
    this.retrieveVoters();
    this.votes = this.handleVoteClick.bind(this);
    this.footer = this.footer.bind(this);
  } 

  componentDidMount() {
    this.interval = setInterval(this.retrieveVoters.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  retrieveVoters() {
    // console.log('retrieve');
    Client.retrieve(data => {
      const voters = {
        all: [],
        voted: [],
        pending: []
      };
      voters.all = data;
      voters.voted = data.filter((voter) => 
        { return voter.status == 'voted'; }).sort((v1, v2) => 
        { return v1 - v2 });
      voters.pending = data.filter((voter) => 
        { return voter.status !== 'voted'});
      this.state.voters = voters;
    });
  }

  handleVoteClick(swtch) {
    this.state.view = 'voted';
    this.state.showVotes = true;
    return this.state.showVotes;
  }

  handleNewVoteClick() {
    this.state.view = 'all';
    this.state.showVotes = false;
  }

  footer() {
    if (this.state.voters.voted.length > 0 && !this.state.showVotes) 
      return (<div>
        <Button onClick={ (e) => this.handleVoteClick(true) } bsStyle="primary" bsSize="large">Show results</Button>
      </div>);
    else if (this.state.showVotes) {
      return (<div>
        <Button onClick={ (e) => this.handleNewVoteClick(true) } bsStyle="primary" bsSize="large">Start New Vote</Button>
      </div>);
    }
    
    return '';
  }

  render() {
    const view = this.state.view === 'all'?this.state.voters.all:this.state.voters.voted;
    return (
      <div className="container" style={{"width": "100%", "text-align": "center"}}>
        <VoterQueue voters={view} showVotes={this.state.showVotes}  />
        { this.footer() }
      </div>
      
    );
  }
}

function VoterQueue(props) {
  const voters = [];
  for (let voter of props.voters)
    voters.push(<td className="VoterCell"><Voter key={ voter.name } voter={ voter } showVote={ props.showVotes } /></td>)
  return (
    <div >
      <table style={{ "display": "inline-block" }}>
        <tr>{ voters }</tr>
      </table>
    </div>
  );
}

function Voter(props) {
  const avatar = '/avatars/' + props.voter.avatar;
  const votedClass = props.voter.status === 'voted'?'success':'default';
  const vote = props.voter.vote === ''?'?':props.voter.vote;
  return (
    <div>
      <div>
        <Panel bsStyle={ votedClass } header={ props.voter.name }  style={{ "height": 180, "maxWidth": 171} }>
          <Image src={ avatar } alt='171x180' responsive= {true} />          
        </Panel>
      </div>
      <div>
        <Panel collapsible expanded={props.showVote}>
          <h1>{ vote }</h1>
        </Panel>
      </div>
    </div>
  );
}

export default Moderator;
