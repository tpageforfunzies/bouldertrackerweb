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
    console.log('[gatherRecentRoutes] jwt', this.props.jwt)
    let authHeader = { "Authorization": "Bearer ".concat(this.props.jwt) }

    console.log('[homeroll] authHeader', authHeader);

    try {
      axios.get('https://www.hackcity.dev/v1/routes', {
        headers: authHeader
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
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
    this.gatherRecentRoutes();
    console.log('[homeroll] inside render', this.state.jwt)
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