import React, { Component } from 'react';
import './App.css';
import Client from "./Client";
import { Image, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import Gallery from 'react-grid-gallery';
import { HeaderPanel } from './Headers.js';
import { notify } from 'react-notify-toast';
import Cookies from 'universal-cookie';

const avatarsMap = new Map();
avatarsMap.set(
  'erata.png', ['Erata', 'ErataBog', 'Erata Bog', 'Ерата', 'Ерата Бог', 'ЕратаБог']
);
avatarsMap.set(
  'Batman.png', ['Adi', 'Adriana', 'Ади', 'Адриана', 'Addi', 'Батман', 'Batman']
);

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
    this.startVoteClick = this.startVoteClick.bind(this);
    this.retrieveAvatars();
  }

  componentDidMount() {
    this.interval = setInterval(this.retrieveAvatars.bind(this), 1000);
    const cookies = new Cookies();
    const cookie = cookies.get('groomingAppCookie');
    if (cookie)
      this.setState({
        value: cookie.name,
        avatarSelected: true,
        displayGrid: false,
        selectedAvatar: {
          src: '/public/avatars/' + cookie.avatar
        }
      });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  retrieveAvatars() {
    // console.log('retrieve');
    Client.retrieve('/user-avatars', (data, err) => {
      if (err)
        return notify.show('Unable to read avatars', 'warning');
      this.setState({ avatars: data });
    });
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length > 1 && length <= 9) return 'success';
    else if (length > 9) return 'warning';
    return null;
  };

  handleChange(e) {
    this.setState({ value: e.target.value });
  };

  tumbnailClickHandler(index) {
    // notify.show('This avatar was already taken', 'warning');
    // selected = 
    const selectedAvatar = this.state.avatars[index];
    if (selectedAvatar.isSelected)
      return;
    if (!this.validateAvatarSel(selectedAvatar.name, this.state.value)) 
      return notify.show('Only those worthy by Name may select this avatar!', 'warning');
    this.setState({ 
      selectedAvatar: selectedAvatar,
      avatarSelected: true,
      showGrid: false
    });
  }

  validateAvatarSel(avatar, name) {
    const names = avatarsMap.get(avatar);
    return names ? names.includes(name) : true; 
  }

  startVoteClick(e) {
    Client.post('/join', 'POST', 
      { 
        name: this.state.value, 
        avatar: this.state.selectedAvatar.name,
        rejoin: false 
      }, 
        (data, err) => {
          if (err) 
            return notify.show('This avatar was already taken', 'warning');;
          window.location = '/voting';
      }); 
  }

  render() {
    let avatarSelection; 
    let joinButton = '';
    if (this.state.avatarSelected)
      avatarSelection = 
        <Avatar src={ this.state.selectedAvatar.src } 
          onClick={() => { this.setState({ displayGrid: true, avatarSelected: false }); }}/>;
    else if (this.state.displayGrid)
      avatarSelection = 
        <Gallery rowHeight={80} images={ this.state.avatars } 
            enableLightbox={false} enableImageSelection={false}
            onClickThumbnail={ this.tumbnailClickHandler.bind(this) }/>;
    else
      avatarSelection = 
        <Avatar src="/public/Unknown-person.png" 
            onClick={() => { this.setState({ displayGrid: true }); }} />;
    if (!this.state.displayGrid || this.state.avatarSelected)
      joinButton = 
          <Button onClick={ this.startVoteClick }  
              bsStyle="primary" 
              disabled={ !this.state.avatarSelected || this.getValidationState() !== 'success' }
              >Start Voting >></Button>;
    return (
      <div>
        <HeaderPanel msg="Test" severity="warning" />
        <div style={{ "padding": 10}}>
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
        <div style={{ "textAlign" : "right", "padding": 10}}>
          { joinButton }
        </div>
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