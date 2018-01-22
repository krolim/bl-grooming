import React, { Component } from 'react';
import './App.css';
import Client from "./Client";
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { HeaderPanel } from './Headers.js';
import { notify } from 'react-notify-toast';

class Voter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: 'Please vote'
    }
    this.vote = this.vote.bind(this);
  }

  vote(value) {
    Client.post('/vote', 'POST', { vote: value }, (data, err) => {
      this.setState({
        message: this.getUserLog(value, err)
      });
    });
  } 

  getUserLog(value, err) {
    let message = `Your vote is: ${value}`;
    if (err) {
      message = err;
      if (err.statusCode) {
        if (err.statusCode == 401)
          window.location = '/reg';
        if (err.statusCode === 403) 
          message = 'Failed: Voting is closed!'
      };
    }
    return message;

  }

  buttons() {
    const rows = [];
    for(let i=1; i<4; i++) {
      rows.push(
        <div style={{ width: "100%"}}>
          <button type="button" className="button" onClick={ () => this.vote(i) } >{ i }</button> 
          {/* <Button bsSize="large" onClick={ () => this.vote(i) } block><h2>{ i }</h2></Button> */}
        </div>
      );
    } 
    rows.push(
      <div style={{ width: "100%" }}>
        <span>
          <button type="button" className="button xs" onClick={ () => this.vote(4) } >{ 4 }</button> 
        </span>
        <span>
          <button type="button" className="button xs" onClick={ () => this.vote(5) } >{ 5 }</button> 
        </span>
      </div>
    );
    return rows;
  }
  
  render() {
    return(
      <div>
        <div>
          <HeaderPanel />
        </div>
        <div class='votePannel'>
          {  this.state.message }
        </div>
        <div className="voter-button-panel">
          <div style={{ height: "400px"}}>
            { this.buttons() }          
          </div>
        </div>
      </div>
    );
  }

}

export default Voter;