import React, { Component } from 'react';
import axios from 'axios';

class HomeRoll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jwt: '',
      authed: false,
      routes: []
    }

    this.gatherUser();
    this.gatherRecentRoutes();
  }

  handleGatherRoutes = (routes) => {
    this.setState({
      routes: routes
    });
    console.log('[HomeRoll] Gathered Routes', this.state.routes);
  }

  gatherUser =() => {
    if(this.props.authed) {
      this.setState({
        authed: true,
        jwt: this.props.jwt
      })
      
    } else {
    }
  }

  gatherRecentRoutes = () => {
    try {
      axios.get('https://www.hackcity.dev/v1/routes/10')
      .then((res) => {
        this.handleGatherRoutes(res.data.routes);
        console.log('gather routes success');
      })
      .catch((err) => {
        console.log('gather routes failure', err);
        alert(err);
      })
    } catch(err) {
      alert(err);
    }
  }

  render() {

    return (
      <div className="home-roll uk-section">
        <div className="gridl">
          <div className="title uk-text-center uk-text-left@m">
            <h2 className="bold black">Recent Sends</h2>
          </div>

        </div>
      </div>
    );
  }
}

export default HomeRoll;