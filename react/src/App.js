import React, { Component } from 'react';
// import './App.css';
import Client from "./Client";
import { Route } from 'react-router'
import { BrowserRouter, Switch } from 'react-router-dom';
import Moderator from './Moderator';
import Register from './Register';
import Voter from "./Voter";

class App extends Component {
 
  render() {
      return (
        
      <div style={{ "width": "100%" }}>
      <BrowserRouter>
        <div>
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
