import React, { Component } from 'react';
import './App.css';
import Picker from 'rmc-picker';
import MultiPicker from 'rmc-picker';
import Client from "./Client";
import {Grid, Row, Col, Button }  from 'react-bootstrap';
import { HeaderPanel } from './Headers.js';
import { notify }  from 'react-notify-toast';
// import click from './snd/click.mp3';

class Voter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: 'Please vote',
      voteValue: '3'
    }
    this.vote = this.vote.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
  }

  vote() {
    // let value = val ? val:this.state.voteValue;
    // alert(this.state.voteValue);
    let value = this.state.voteValue;
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
  
  onValueChange(value) {
    this.setState({
      voteValue: value
    })
    // let audio = new Audio(click);
    // audio.play();
    // alert(window.navigator.vibrate);
    // window.navigator.vibrate(200);
    // alert(value);
  }

  picker() {
    const start = 1;
    const len = 5;
    const items = [];
    for (let i = start; i < start + len; i++) {
      items.push(<Picker.Item value={i + ''} key={i}>
        {i}
      </Picker.Item>);
    }
    return  <div style={{ background: '#f5f5f9', padding: 10, textAlign: "center" }}>
      <Picker 
        defaultSelectedValue={this.state.voteValue}
        // selectedValue={this.state.voteValue}
        onValueChange={this.onValueChange}
      >
        { items }
      </Picker>
    </div>
  }
  
  render() {
    return(
      <div>
        <div>
          <HeaderPanel />
        </div>
        <div className='votePannel'>
          {  this.state.message }
        </div>
        <div >
          { this.picker() }          
        </div>
        <div style={{ paddingTop: '10px' }}>
          <button onClick={this.vote} className="button">Vote</button>
        </div>
      </div>
    );
  }

}

export default Voter;