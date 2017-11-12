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
    Client.retrieve('/voters', (data) => {
      // console.log(data); /public/voters.json
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
      this.setState({ voters: voters });
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
    if (this.state.voters.all.length < 2) {
      return(<h2>Waiting for voters to join...</h2>);
    } else {
      const button = {
        onClick: this.state.showVotes?
          this.handleNewVoteClick:this.handleVoteClick,
        title: this.state.showVotes?
          'Start New Vote':'Show results'
      };
      return (<div>
        <Button disabled={ this.state.voters.voted.length < 2 } 
            onClick={ button.onClick } bsStyle="primary" bsSize="large">{ button.title }</Button>
      </div>);
    }
    
    // return '';
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
  const avatar = '/public/avatars/' + props.voter.avatar;
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
