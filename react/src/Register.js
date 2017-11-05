import React, { Component } from 'react';
import './App.css';
import Client from "./Client";
import {Image, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.handleChange = this.handleChange.bind(this);
  }

  getInitialState() {
    return {
      value: ''
    };
  };

  getValidationState() {
    const length = this.state.value.length;
    if (length > 1 && length < 12 ) return 'success';
    else if (length > 11) return 'warning';
    return null;
  };

  handleChange(e) {
    this.setState({ value: e.target.value });
  };

  render() {
    return (
      <div>
        <form>
          <FormGroup
            controlId="name"
            validationState={this.getValidationState()}
          >
            <ControlLabel>Name</ControlLabel>
            <FormControl
              type="text"
              value={this.state.value}
              placeholder="Enter name"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup
            controlId="avatar"
            validationState={this.getValidationState()}
          >
            <ControlLabel>Avatar</ControlLabel>
            <div style={{ width: "171px", height: "180px"}}>
              <Image src="/avatars/Unknown-person.png" alt='171x180' responsive= {true} /> 
            </div>
          </FormGroup>
        </form>
      </div>
    );
  }
}

export default Register;