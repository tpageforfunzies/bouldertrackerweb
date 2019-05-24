import React, { Component } from 'react';
import { BrowserRouter as Redirect } from 'react-router-dom';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: []
    }
  }

  render() {
    console.log('id: ', this.props.id);

    if (this.props.id > 0) {
      return (
        <div>
          <div className="uk-text-center uk-section">
            <h1>My Routes</h1>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/login" />;
    }
    
  }
}

export default Profile;