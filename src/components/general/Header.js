import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './Header.scss';

export default class Header extends Component  {
  render() {
    return (
      <div className="header bgone">
        <div className="uk-navbar-left">
          <ul>
            <li>
              <h1 className="white bold">BoulderTracker</h1>
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
