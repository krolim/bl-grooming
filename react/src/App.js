import React, { Component } from 'react';
// import './App.css';
import Client from "./Client";
import { Route } from 'react-router'
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Moderator from './Moderator';
import Register from './Register';
import Voter from "./Voter";
import { MediaQuery } from 'react-responsive';

class App extends Component {

  componentWillMount(){
    this.setState({width: window.innerWidth});
  }
  

  render() {
      const redirect = this.state.width > 1000 ? '/admin':'/reg';
      return (
      <div style={{ "width": "100%" }}>
        <BrowserRouter>
          <div>
              <Switch>
                <Route path="/reg" component={Register}/>
                <Route path="/voting" component={Voter}/>
                <Route path="/admin" component={Moderator}/> 
              </Switch>
              <Redirect to={redirect} />
          </div>
        </BrowserRouter>
    </div>
    );
  }
}

export default App;
