import React, { Component } from 'react';
// import './App.css';
import Client from "./Client";
import { Route } from 'react-router'
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Moderator from './Moderator';
import Register from './Register';
import Voter from "./Voter";
import { MediaQuery } from 'react-responsive';
import Cookies from 'universal-cookie';

class App extends Component {

  componentWillMount(){
    const cookies = new Cookies();
    console.log(cookies.get('groomingAppCookie'));
    this.setState({width: window.innerWidth});
  }
  

  render() {
    const cookies = new Cookies();
    const cookie = cookies.get('groomingAppCookie');
    const redirect = this.state.width > 1000 ? <Redirect to="/admin" />:
      window.location.pathname === '/' ? 
      cookie ? <Redirect to="/voting" /> : <Redirect to="/reg" /> : '';
    return (
      <div style={{ "width": "100%" }}>
        <BrowserRouter>
          <div>
              <Switch>
                <Route path="/reg" component={Register}/>
                <Route path="/voting" component={Voter}/>
                <Route path="/admin" component={Moderator}/> 
              </Switch>
              {redirect} 
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
