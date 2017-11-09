import React, { Component } from 'react';
import './App.css';
import Client from "./Client";
import { Image, FormGroup, ControlLabel, FormControl, Grid, Row, Col } from 'react-bootstrap';
import Gallery from 'react-grid-gallery';

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      avatars: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.retrieveAvatars = this.retrieveAvatars.bind(this);
    this.retrieveAvatars();
  }

  retrieveAvatars() {
    // console.log('retrieve');
    Client.retrieve('/user-avatars', (data) => {
      this.setState({ avatars: data });
      console.log('state>>>>>>>>', this.state);
    });
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length > 1 && length < 12) return 'success';
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
            <Gallery rowHeight={60} images={ this.state.avatars }/>
            {/* <AvatarGrid2 avatars={this.state.avatars} /> */}
            {/* <UnknownAvatar /> */}
          </FormGroup>
        </form>
      </div>
    );
  }
}

const UnknownAvatar = (props) => {
  return (
    <div style={{ "height": 80, "maxWidth": 71 }}>
      <Image src="/avatars/Unknown-person.png" alt='171x180' responsive={true} />
    </div>
  );
}

export default Register;