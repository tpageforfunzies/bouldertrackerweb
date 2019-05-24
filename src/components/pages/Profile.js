import React, { Component } from 'react';
import { BrowserRouter as Redirect, Link } from 'react-router-dom';
import axios from 'axios';

import './scss/Profile.scss';

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
      ],
      email: '',
      name: '',
      id: this.props.id
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

  fetchUser = () => {
    let url = 'https://www.hackcity.dev/v1/user/' + this.props.id.toString();
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
          <div className="uk-grid uk-grid-medium profile-container">
            <div className="uk-width-1-1 uk-width-1-3@m profile bgtwo">
              <div className="uk-section">
                <h1 class="bold white">Profile</h1>
                <img className="avatar" src="https://placekitten.com/250/250" />
                <h2 className="bold white">Jeff Hooton</h2>
                <p className="white"><span className="bold">Email:</span> jeffreyd@hooton.com</p>
                <div className="whiteline"></div>
                <h3 className="bold white">Statistics</h3>
                <p className="white"><span className="bold">Sends:</span> 12</p>
                <p className="white"><span className="bold">Average Difficulty Sent:</span> V3</p>
                <p className="white"><span className="bold">Most Difficult Route:</span> V6</p>
                <p className="white"><span className="bold">Most Active Month:</span> May</p>
              </div>
            </div>
            <div className="uk-width-1-1 uk-width-2-3@m routes">
              <div className="uk-section">
              <div className="uk-grid">
                  <div className="uk-width-1-1 uk-width-1-2@s uk-text-center uk-text-left@s">
                    <h1 class="bold">My Routes</h1>
                  </div>
                  <div className="uk-width-1-1 uk-width-1-2@s uk-text-center uk-text-right@s">
                    <Link to="/new-route" className="button brandone-outline">Add Route</Link>
                  </div>
                </div>
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
          </div>
          
        </div>
      );
    } else {
      return <Redirect to="/login" />;
    }
    
  }
}

export default Profile;