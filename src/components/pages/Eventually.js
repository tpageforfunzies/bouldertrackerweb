import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, withRouter } from 'react-router-dom';

import './scss/Eventually.scss';

class Eventually extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    let destinationTop = 'THIS IS WHERE ID PUT MY ';
    let destinationMiddle = '';
    switch (this.props.match.params.destination) {
      case 'dir':
        destinationMiddle = "DIRECTORY";
        break;
      case 'hoc':
        destinationMiddle = "HALL OF CRUSHERS";
        break;
      case 'fc':
        destinationMiddle = "FOLLOWERS FEED";
        break;
      default:
        destinationMiddle = "GENERIC";
        break;
    }
    let destinationBottom = "IF I HAD ONE";

    return (
      <div className="login-page-container overlay">
        <div className="eventually">
          {destinationTop}
          <br />
          {destinationMiddle}
          <br />
          <img src="https://bouldertrackerpics.s3.us-east-2.amazonaws.com/fop.jpg" />
          <br />
          {destinationBottom}
        </div>
        
      </div>
    )
    
  }
}


export default withRouter(Eventually);