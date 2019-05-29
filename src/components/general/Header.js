import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';

import './scss/Header.scss';

class Header extends Component  {

  render() {
    if(this.props.authed) {
      return (
        <div>
          <div className="header bgone">
            <div className="uk-navbar-left">
              <ul>
                <li>
                  <Link to="/" className="white bold brand">BoulderTracker</Link>
                </li>
              </ul>
            </div>
            <div className="uk-navbar-right">
              <ul>
                <li>
                  <Link to="/new-route" className="white bold">Add Routes</Link>
                </li>
                <li>
                  <Link to="/profile" className="white bold">Profile</Link>
                </li>
                <li>
                  <a className="button white-outline" onClick={this.props.handleLogout}>Logout</a>
                </li>
              </ul>       
            </div>
          </div>
          <div className="header-spacer"></div>
        </div>
      );
    }

    return (
      <div className="header bgone">
        <div className="uk-navbar-left">
          <ul>
            <li>
              <Link to="/" className="white bold brand">BoulderTracker</Link>
            </li>
          </ul>
        </div>
        <div className="uk-navbar-right">
          <ul>
            <li>
              <Link to="/login" className="button white-outline">Login</Link>
            </li>
            <li>
              <Link to="/register" className="button white-outline">Register</Link>
            </li>
          </ul>       
        </div>
      </div>
    );
  }
}

export default withRouter(Header);