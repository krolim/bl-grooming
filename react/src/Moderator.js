import React, { Component } from 'react';
import './App.css';
import Client from "./Client";
import { Panel, Image, Row, Col, Button } from 'react-bootstrap';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

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
      voteStats: {
        min: -1,
        max: 1000,
        weights: [],
        allVoters: 0,
        avg: 0,
        decision: false
      },
      showVotes: false,
      votingFinished: false, 
      view: 'all'
    };
    this.handleVoteClick = this.handleVoteClick.bind(this);
    this.handleNewVoteClick = this.handleNewVoteClick.bind(this);
    this.footer = this.footer.bind(this);
  } 

  componentDidMount() {
    this.retrieveVoters();
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
        voter.status == 'voted')
          .sort((v1, v2) => 
        v1.vote - v2.vote);
      voters.pending = data.filter((voter) => 
        voter.status !== 'voted');
      if (voters.voted.length > 1) {
        this.setState({
          voteStats: this.getStats(voters)
        });
      }
      this.setState({ voters: voters });
    });
  }

  getStats(voters) {
    const allVoters = voters.all.length;
    const weights = [];
    for (let i=0; i<allVoters; ++i)
      weights.push(0);
    const stats = {
      allVoters: allVoters,
      decision: false,
      weights: weights,
      avg: 0,
      min: voters.voted[0].vote, 
      max: voters.voted[voters.voted.length-1].vote
    };
    stats.decision = stats.min === stats.max && stats.min > 0;
    if (stats.decision) {
      stats.avg = stats.min;
      stats.weights[stats.min] = allVoters;
    } else {
      let sum = 0;
      voters.all.forEach(voter => {
        const vote = Number.parseInt(voter.vote);
        sum +=  vote;
        stats.weights[vote] += 1;
      });
      stats.avg = sum/allVoters;
    }
    return stats;
  }

  handleVoteClick() {
    Client.post('close', 'POST', {}, (data, err) => {
      if (err)
        console.log(err);
      this.setState({
        view : 'voted',
        showVotes : true
      });
    });
    return this.state.showVotes;
  }

  handleNewVoteClick(reset) {
    Client.post('new-vote', 'PUT', { reset: reset }, (data, err) => {
      if (err)
        console.log(err);
      this.setState({
        view: 'all', 
        showVotes: false
      });
    });
  }

  voteStats(stats) {
    const weights = [];
    stats.weights.forEach((weight, index) => {
      if (weight > 0) {
        const percent = weight/stats.allVoters*100;
        weights.push(
          <span>{ index + ' (' + percent + '%' + ')'}</span>);
      }
    });
    return (
      <div className="voteStats">
        Avg: {stats.avg.toFixed(2)}, Min: {stats.min}, Max: {stats.max} -- {weights}
      </div>
    );
  }

  footer() {
    if (this.state.voters.all.length < 2) {
      return(<h2>Waiting for voters to join...</h2>);
    } else {
      const button = {
        onClick: () => this.state.showVotes?
          this.handleNewVoteClick(false):this.handleVoteClick(),
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

  nav() {
    return (
      <div>
      <Navbar fluid={true} inverse={true}>
        <Navbar.Header>
          <Navbar.Brand>
            <LinkContainer to="/">
              <a>BL Grooming</a>
            </LinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem onClick={ () => this.handleNewVoteClick(true) }>Reset</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
    );
  }

  render() {
    const view = this.state.view === 'all'?this.state.voters.all:this.state.voters.voted;
    const body = this.state.voteStats.decision ? 
      <div className="voteDecision"></div> : 
      <div>
        <VoterQueue voters={view} showVotes={this.state.showVotes} voteStats={this.state.voteStats}  />;
          { this.state.showVotes?this.voteStats(this.state.voteStats):'' }
      </div>
    return (
      <div>
        { this.nav() }
        <div className="container" style={{"width": "100%", "textAlign": "center"}}>
          { body }
          { this.footer() }
        </div>
      </div>      
    );
  }
}

function VoterQueue(props) {
  const voters = [];
  for (let voter of props.voters)
    voters.push(
      <td className="VoterCell">
        <div>
          <Voter key={ voter.name } 
                voter={ voter } 
                showVote={ props.showVotes }
                minVote={ props.voteStats.min === voter.vote }
                maxVote={ props.voteStats.max === voter.vote }  />
        </div>
      </td>);
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
  let pannelStyle = props.voter.status === 'voted'?'primary':'default';
  const minVote = props.minVote;
  const maxVote = props.maxVote;
  const showVote = props.showVote;
  if (showVote && minVote && minVote !== maxVote) {
    pannelStyle = 'success';
  } 
  if (showVote && maxVote && minVote !== maxVote) {
    pannelStyle = 'danger';
  }
  const vote = props.voter.vote === ''?'?':props.voter.vote;
  return (
    <div>
      <div>
        <Panel bsStyle={ pannelStyle } header={ props.voter.name }  style={{ maxWidth: 171} }>
          <div className="ImageCell">
            <Image src={ avatar } alt='171x171' style={{ width: 80, height: 80 }} />          
          </div>
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
