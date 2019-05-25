import React, { Component } from 'react';
import { BrowserRouter as Redirect, Link } from 'react-router-dom';
import axios from 'axios';

import './scss/Profile.scss';

import RouteBox from '../general/RouteBox';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: [],
      email: '',
      name: '',
      id: this.props.id
    }

    this.fetchRoutes();
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

  calculateAverage = () => {
    let routeCount = this.state.routes.length;
    let routes = this.state.routes;
    let average = (routes.reduce((sum, route) => sum + parseInt(route.grade), 0) / routeCount).toFixed(2);
    return average;
  }

  calculateHighest = () => {
    let routes = this.state.routes;
    let highest = Math.max.apply(null, routes.map(function(route) {
      return parseInt(route.grade);
    }));
    return highest;
  }

  render() {
    console.log('id: ', this.props.id);

    if (this.props.id > 0) {
      return (
        <div>
          <div className="uk-grid uk-grid-collapse profile-container">
            <div className="uk-width-1-1 uk-width-1-3@m uk-text-center uk-text-left@m profile bgtwo">
              <div className="uk-section">
                <h1 className="bold white">Profile</h1>
                <img className="avatar" src="https://placekitten.com/250/250" alt="placeholder avatar" />
                <h2 className="bold white">Jeff Hooton</h2>
                <p className="white"><span className="bold">Email:</span> jeffreyd@hooton.com</p>
                <div className="whiteline"></div>
                <h3 className="bold white">Statistics</h3>
                <p className="white"><span className="bold">Sends:</span> {this.state.routes.length}</p>
                <p className="white"><span className="bold">Average Difficulty Sent:</span> {this.calculateAverage()} </p>
                <p className="white"><span className="bold">Most Difficult Route:</span> {this.calculateHighest()} </p>
                <p className="white"><span className="bold">Most Active Month:</span> May</p>
              </div>
            </div>
            <div className="uk-width-1-1 uk-width-2-3@m routes">
              <div className="uk-section">
              <div className="uk-grid">
                  <div className="uk-width-1-1 uk-width-1-2@s uk-text-center uk-text-left@s">
                    <h1 className="bold">My Routes</h1>
                  </div>
                  <div className="uk-width-1-1 uk-width-1-2@s uk-text-center uk-text-right@s">
                    <Link to="/new-route" className="button brandone-outline">Add Route</Link>
                  </div>
                </div>
                <div className="uk-grid uk-grid-small">
                  {this.state.routes ?
                  this.state.routes.reverse().map((route, index) => (
                    <RouteBox key={index} name={route.name} grade={route.grade} sendDate={route.CreatedAt}/>
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