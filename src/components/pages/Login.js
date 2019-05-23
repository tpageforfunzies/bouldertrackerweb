import React, { Component } from 'react';

import './Login.scss';
import Header from '../general/Header';

export default class Login extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="login-form">
          <h1 className="bold">Login Form</h1>
          <form>
            <input type="text" name="email" />
            <input type="text" name="password" />
          </form>
        </div>
      </div>
    )
  }
}