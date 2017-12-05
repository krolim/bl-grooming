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
      vote: 0
    }
    this.vote = this.vote.bind(this);
  }

  vote(value) {
    Client.post('/vote', 'POST', { vote: value }, (data, err) => {
      console.log('----->', err);
      if (err == 'Error: HTTP Error Unauthorized')
        window.location = '/reg';
      this.setState({
        vote: value
      });
    });
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
           
          {/* <Button onClick={ () => this.vote(4) } bsSize="large" block><h3>4</h3></Button> */}
        </span>
        <span>
          <button type="button" className="button xs" onClick={ () => this.vote(5) } >{ 5 }</button> 
           
          {/* <Button onClick={ () => this.vote(5) } bsSize="large" block><h3>5</h3></Button> */}
        </span>
      </div>
    );
    return rows;
  }
  
  render() {
    const message = this.state.vote === 0 ? 'Please vote': 'Your vote is ' + this.state.vote;
    return(
      <div>
        <div>
          <HeaderPanel />
        </div>
        <div class='votePannel'>
          { message }
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