import React, { Component } from 'react';
// import './App.css';
import Client from "./Client";
import { Route } from 'react-router'
import { BrowserRouter, Switch } from 'react-router-dom';
import Moderator from './Moderator';
import Register from './Register';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Voter from "./Voter";

class App extends Component {
 
  render() {
      return (
        
      <div style={{ "width": "100%" }}>
      <BrowserRouter>
        <div>
          <div>
            <Navbar fluid={true} inverse={true}>
              <Navbar.Header>
                <Navbar.Brand>
                  <LinkContainer to="/">
                    <a>BL Grooming</a>
                  </LinkContainer>
                </Navbar.Brand>
              </Navbar.Header>
              <Nav>
              <LinkContainer to="/reg">
                  <NavItem>Register</NavItem>
                </LinkContainer>
                <LinkContainer to="/voting">
                  <NavItem>Voter</NavItem>
                </LinkContainer>
                <LinkContainer to="/admin">
                  <NavItem>Moderator</NavItem>
                </LinkContainer>
              </Nav>
            </Navbar>
          </div>
            <Switch>
              <Route path="/reg" component={Register}/>
              <Route path="/voting" component={Voter}/>
              <Route path="/admin" component={Moderator} /> }/>
            </Switch>
        </div>
      </BrowserRouter>
    </div>
    );
  }
}

export default App;
