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
            <Gallery rowHeight={50} images={ this.state.avatars }/>
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

const AvatarGrid2 = (props) => {
  const rows = [];
  let row = [];
  const l = props.avatars.length;
  for (let i = 0; i < l; i++) {
    const imgSrc = '/avatars/' + props.avatars[i].img;
    const cell = (
      <Col xs={3}>
        <div style={{ "height": 80, "maxWidth": 71, "border-width": "1px", "border-style": "solid" }}>
          <Image src={imgSrc} alt='71x80' responsive={true} />
        </div>
      </Col>
    );
    row.push(cell);
    if (i !== 0 && (i % 5 === 0 || i === l-1)) {
      rows.push(<Row> {row} </Row>);
      row = [];
    }
  }
  return (
    <div style={{ "text-align": "left" }}>
      <Grid fluid={true} style={{ "text-align": "left"  }}>
        {rows}
      </Grid>
    </div>
  );
}

const AvatarGrid = (props) => {
  const rows = [];
  let row = [];
  const l = props.avatars.length;
  for (let i = 0; i < l; i++) {
    const imgSrc = '/avatars/' + props.avatars[i].img;
    const cell = 
      <td style={{"border-width": "1px", "border-style": "dashed"}}>
        <div style={{ "height": 80, "maxWidth": 71, "border-width": "1px", "border-style": "dashed" }}>
          <Image src={imgSrc} alt='71x80' responsive={true} />
        </div>
      </td>;
    row.push(cell);
    if (i !== 0 && (i % 5 === 0 || i === l-1)) {
      rows.push(<tr> {row} </tr>);
      row = [];
    }
  }
  return (
    <div style={{ "width": "100%" }}>
      <table style={{ "width": "100%" }}>
        {rows}
      </table>
    </div>
  );
}

export default Register;