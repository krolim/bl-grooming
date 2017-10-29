import React, { Component } from 'react';
import './App.css';
import Client from "./Client";
import { Route } from 'react-router'
import { BrowserRouter, Switch, Link } from 'react-router-dom'
import Moderator from './Moderator';

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
      <div className="App">
        <BrowserRouter>
          <div>
            <nav>
              <div>
                <Link to="/vote">Voter</Link>
              </div>
              <div>
                <Link to="/admin">Moderator</Link>
              </div>
            </nav>
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
