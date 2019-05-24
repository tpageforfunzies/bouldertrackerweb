import React, { Component } from 'react';
import { BrowserRouter as Redirect } from 'react-router-dom';
import axios from 'axios';

import RouteBox from '../general/RouteBox';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: [
        {
          'ID': 1,
          name: 'Route 1',
          grade: 'V1' 
        },
        {
          'ID': 1,
          name: 'Route 1',
          grade: 'V1' 
        },
        {
          'ID': 1,
          name: 'Route 1',
          grade: 'V1' 
        },
        {
          'ID': 1,
          name: 'Route 1',
          grade: 'V1' 
        },
        
      ]
    }

  }

  handleRoutes = routes => {
    this.setState({ routes: routes });
  }

  fetchRoutes = () => {
    let url = 'https://www.hackcity.dev/v1/user/' + this.props.id.toString() + '/routes';
    console.log('fetchRoutes->jwt', this.props.jwt);
    let authHeader = { "Authorization": "Bearer ".concat(this.props.jwt) }
    try {
      axios.get(url, {
        headers: authHeader
      })
      .then((res) => {
        this.handleRoutes(res.data.routes);
        console.log('post-axios route gather:', this.state.routes);
      })
      .catch((err) => {
        console.log(err);
      })
    } catch (e) {
      alert(e);
    }
  }

  render() {
    console.log('id: ', this.props.id);

    if (this.props.id > 0) {
      return (
        <div>
          <div className="uk-text-center uk-section">
            <h1>My Routes</h1>
            <div className="uk-grid uk-grid-small">
              {this.state.routes ?
              this.state.routes.map((route, index) => (
                <RouteBox key={index} name={route.name} grade={route.grade} />
              )) 
              :<h2>'No Routes found.'</h2> 
              }
            </div>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/login" />;
    }
    
  }
}

export default Profile;