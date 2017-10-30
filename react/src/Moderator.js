import React, { Component } from 'react';
import './App.css';
import Client from "./Client";
import { Panel, Image, Row, Col } from 'react-bootstrap';
// import { Link } from 'react-router-dom'

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
    // console.log('retrieve');
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
    voters.push(<Col xs={4} md={2} lg={1}><Voter key={ voter.name } voter={ voter } /></Col>)
  return (
    <div className="container">
      <Row>
        { voters }
      </Row>
    </div>
  );
}

function Voter(props) {
  let avatar = '/avatars/' + props.voter.avatar;
  let votedClass = props.voter.status === 'voted'?'success':'default';
  return (
    <Panel bsStyle={ votedClass } header={ props.voter.name }  style={{ "height": 180, "maxWidth": 171} }>
      <Image src={ avatar } alt='171x180' responsive= {true} />
    </Panel>
  );
}

export default Moderator;
