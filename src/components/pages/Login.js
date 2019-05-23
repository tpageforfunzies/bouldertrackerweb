import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './Login.scss';
import Header from '../general/Header';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    try {
      axios.post('https://hackcity.dev/v1/user/login', {
        email: this.state.email,
        password: this.state.password,
      })
      .then((response) => {
        this.props.childProps.userHasAuthenticated(true, response.data.user.ID);
      })
      .catch(function (error) {
        console.log(error);
      });
      
    } catch (e) {
      alert(e.message);
    }
  }
  
  render() {
    return (
      <div>
        <Header />
        <div className="login-form">
          <h2 className="bold">Login</h2>
          <form onSubmit={this.handleSubmit}>
            <input 
              type="text" 
              name="email" 
              placeholder="Email Address"
              onChange={this.handleChange}
              value={this.state.email} 
            />
            <input 
              type="text" 
              name="password" 
              placeholder="Password"
              onChange={this.handleChange}
              value={this.state.password} 
            />
            <input 
              type="submit" 
              value="Submit" 
            />
          </form>
        </div>
      </div>
    )
  }
}


export default Login;