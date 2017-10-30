import React, { Component } from 'react';
import './App.css';
import Client from "./Client";
import { Panel, Image, Row, Col } from 'react-bootstrap';
// import { Link } from 'react-router-dom'

class Moderator extends Component {
  state = {
    voters: [],
    showVotes: true
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
    // console.log('retrieve');
    Client.retrieve(data => {
      this.setState({ voters: data});
    });
  }

  render() {
    return (
      <VoterQueue voters={this.state.voters} showVotes={this.state.showVotes}  />
    );
  }
}

function VoterQueue(props) {
  let voters = [];
  for (let voter of props.voters)
    // voters.push(<Col xs={4} md={2} lg={2}><Voter key={ voter.name } voter={ voter } /></Col>)
    voters.push(<td className="VoterCell"><Voter key={ voter.name } voter={ voter } showVote={ props.showVotes } /></td>)
  return (
    <div className="container" style={{"width": "100%", "text-align": "center"}}>
      {/* <Row className="show-grid">
        { voters }
      </Row> */}
      <table style={{ "display": "inline-block" }}>
        <tr>{ voters }</tr>
      </table>
    </div>
  );
}

function Voter(props) {
  let avatar = '/avatars/' + props.voter.avatar;
  let votedClass = props.voter.status === 'voted'?'success':'default';
  let vote = props.voter.vote === ""?"?":props.voter.vote;
  return (
    <Panel bsStyle={ votedClass } header={ props.voter.name }  style={{ "height": 180, "maxWidth": 171} }>
      <Image src={ avatar } alt='171x180' responsive= {true} />
      <Panel collapsible expanded={props.showVote}>
        <h1>{ vote }</h1>
      </Panel>
    </Panel>
  );
}

export default Moderator;
