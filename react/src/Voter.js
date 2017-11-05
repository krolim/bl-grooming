import React, { Component } from 'react';
import './App.css';
import Client from "./Client";
import { Grid, Row, Col, Button } from 'react-bootstrap';

class Voter extends Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <div className="container" style={{"width": "100%", "height": "100%", "textAlign": "center"}}>
        <table style={{ "width": "100%" }}>  
          <tr>
            <td colspan="2"><Button bsSize="large" block><h1>1</h1></Button></td>   
          </tr>
          <tr>
            <td colspan="2"><Button bsSize="large" block><h1>2</h1></Button></td>   
          </tr>
          <tr>
            <td colspan="2"><Button bsSize="large" block><h1>3</h1></Button></td>   
          </tr>
          <tr>
            <td xs={6}><Button bsSize="large" block><h3>4</h3></Button></td>   
            <td xs={6}><Button bsSize="large" block><h3>5</h3></Button></td>   
          </tr>
        </table>
      </div>
    );
  }

  oldrender() {
    return(
      <div>
        <Grid fluid={true}>
          <Row>
            <Col><Button bsSize="large" block>1</Button></Col>   
          </Row>
          <Row>
            <Col><Button bsSize="large" block>2</Button></Col>   
          </Row>
          <Row>
            <Col><Button bsSize="large" block>3</Button></Col>   
          </Row>
          <Row>
            <Col xs={6}><Button bsSize="large" block>4</Button></Col>   
            <Col xs={6}><Button bsSize="large" block>5</Button></Col>   
          </Row>
        </Grid>
      </div>
    );
  }

}

export default Voter;