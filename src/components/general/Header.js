import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './Header.scss';

class Header extends Component  {
  constructor(props) {
    super(props);

    this.state = {
      jwt: '',
      isAuthed: false
    }
    this.checkAuth();
  }

  checkAuth = () => {
    console.log('CHECKING AUTH');
    if(localStorage.getItem('jwt')) {
      if(localStorage.getItem('jwt').length > 0) {
        console.log('JWT FOUND');
        this.setState({
          isAuthed: true
        });
      }
    }
  }


  render() {
    console.log('header->render',this.state);
    if(this.state.isAuthed) {
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
                <Link to="/logout" className="button white-outline">Logout</Link>
              </li>
            </ul>       
          </div>
        </div>
      );
    }

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

export default Header;