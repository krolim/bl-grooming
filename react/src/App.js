import React, { Component } from 'react';
import './App.css';
import Client from "./Client";
import { Route } from 'react-router'
import { BrowserRouter, Switch } from 'react-router-dom';
import Moderator from './Moderator';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class App extends Component {
  state = {
    voters: [] 
  };

  constructor(props) {
    super(props);
    this.page = 'menu';
    this.retrieveVoters();
  } 

  componentDidMount() {
    this.interval = setInterval(this.retrieveVoters.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  retrieveVoters() {
    console.log('retrieve');
    Client.retrieve(data => {
      this.setState({ voters: data});
    });
  }

  render() {
      return (
      <div>      
      <BrowserRouter>
        <div>
          <div>
            <Navbar inverse={true}>
              <Navbar.Header>
                <Navbar.Brand>
                  <LinkContainer to="/">
                    <a>BL Grooming</a>
                  </LinkContainer>
                </Navbar.Brand>
              </Navbar.Header>
              <Nav>
                <LinkContainer to="/vote">
                  <NavItem>Voter</NavItem>
                </LinkContainer>
                <LinkContainer to="/admin">
                  <NavItem>Moderator</NavItem>
                </LinkContainer>
              </Nav>
            </Navbar>
          </div>
            <Switch>
              <Route path="/vote" component={Vote}/>
              <Route path="/admin" component={Moderator} /> }/>
            </Switch>
        </div>
      </BrowserRouter>
    </div>
    );
  }
}

function Vote() {
  return <h1>Vote</h1>
}

export default App;
