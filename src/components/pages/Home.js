import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './scss/Home.scss';

import HomeRoll from '../general/HomeRoll';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jwt: '',
      authed: false,
      id: 0
    }

    this.checkAuth();
  }

  checkAuth = () => {
    if(this.props.isAuthed && this.props.jwt && this.props.id) {
      this.setState({
        authed: this.props.isAuthed,
        jwt: this.props.jwt,
        id: this.props.id
      });
    }
  }

  render() {
    let buttons;
    let recent;

    if(this.props.isAuthed) {
    buttons = (
            <div>
              <Link to="/" className="button white-outline hm">Discover</Link>
              <Link to="/profile" className="button white-outline hm">My Profile</Link>
            </div>
      );
    } else {
      buttons = (
            <div>
              {/* <Link to="/" className="button white-outline hm">Discover</Link> */}
              <Link to="/login" className="button white-outline hm">Login</Link>
              <Link to="/register" className="button white-outline hm">Register</Link>
            </div>
      );
    }
    
    if(this.props.isAuthed) {
      

      recent = <HomeRoll 
                  authed={this.props.isAuthed} 
                  jwt={this.props.jwt}
                />
    } else {
      recent = <div></div>
    }

    return (
      <div className="home-container">
        <div className="hero uk-section">
          <div className="gridl">
            <div className="uk-grid uk-grid-collapse">
              <div className="uk-width-1-1 uk-width-1-2@m uk-text-center uk-text-left@m">
                <div className="container">
                  <h1 className="bold white">BoulderTracker</h1>
                  <h3 className="white">The #1 place to track and share your bouldering sends. Keep track of your progress and climbing statistics, and comment on others' progress.</h3>
                  {buttons}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="post-hero bgone">
          <div className="gridm">
            <h1 className="white bold">Why BoulderTracker?</h1>
            
            <div className="uk-grid-collapse uk-grid uk-grid-match">
              <div className="uk-width-1-1 uk-width-1-2@s uk-width-1-3@m">
                <div className="container">
                  <h4 className="white">Track your growth/progression as a climber</h4>
                </div>
              </div>
              <div className="uk-width-1-1 uk-width-1-2@s uk-width-1-3@m">
                <div className="container">
                  <h4 className="white">Gain insights on your climbing style with in-depth statistics</h4>
                </div>
              </div>
              <div className="uk-width-1-1 uk-width-1-2@s uk-width-1-3@m">
                <div className="container">
                  <h4 className="white">Keep tabs on what your favorite climbers(or friends) are climbing</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;