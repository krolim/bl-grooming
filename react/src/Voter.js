import React, { Component } from 'react';
import './App.css';
import Client from "./Client";
import { Grid, Row, Col, Button } from 'react-bootstrap';

class Voter extends Component {

  constructor(props) {
    super(props);
  }

  vote(value) {
    Client.post('/vote', 'POST', { vote: value }, (data, err) => {
      if (err == 'Error: HTTP Error Unauthorized')
        window.location = '/reg';
      console.log('Your vote is: ', value);
    });
  } 

  buttons() {
    const rows = [];
    for(let i=1; i<4; i++) {
      rows.push(
        <tr><td colspan="2">
          <Button bsSize="large" onClick={ () => this.vote(i) } block><h1>{ i }</h1></Button>
        </td></tr>
      );
    } 
    rows.push(
      <tr>
        <td xs={6}><Button onClick={ () => this.vote(4) } bsSize="large" block><h3>4</h3></Button></td>   
        <td xs={6}><Button onClick={ () => this.vote(5) } bsSize="large" block><h3>5</h3></Button></td>   
      </tr>
    );
    return rows;
  }
  
  render() {
    return(
      <div className="container" style={{"width": "100%", "height": "100%", "textAlign": "center"}}>
        <table style={{ "width": "100%" }}>
          { this.buttons() }  
          
        </table>
      </div>
    );
  }

}

export default Voter;