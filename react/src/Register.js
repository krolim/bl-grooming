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
      avatarSelected: false,
      displayGrid: false,
      selectedAvatar: {},
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

  tumbnailClickHandler(index) {
    // selected = 
    this.setState({ 
      selectedAvatar: this.state.avatars[index],
      avatarSelected: true,
      showGrid: false
    });
    console.log('index',index);
    console.log(this.state.selectedAvatar);
  }

  render() {
    let avatarSelection; 
    if (this.state.avatarSelected)
      avatarSelection = 
        <Avatar src={ this.state.selectedAvatar.src } />;
    else if (this.state.displayGrid)
      avatarSelection = 
        <Gallery rowHeight={80} images={ this.state.avatars } 
            enableLightbox={false} 
            onClickThumbnail={ this.tumbnailClickHandler.bind(this) }/>;
    else
      avatarSelection = 
        <Avatar src="/public/avatars/Unknown-person.png" onClick={() => { this.setState({ displayGrid: true }); }} />;
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
           { avatarSelection }
          </FormGroup>
        </form>
      </div>
    );
  }
}

const Avatar = (props) => {
  // /avatars/Unknown-person.png
  
  return (
    <div style={{ "height": 80, "maxWidth": 71 }} onClick={props.onClick}>
      <Image src={ props.src } alt='171x180' responsive={true} />
    </div>
  );
}

export default Register;