import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, withRouter } from 'react-router-dom';

import './scss/Login.scss';

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

  handleEmailChange = e => {
    this.setState({
      email: e.target.value
    });
  }

  handlePasswordChange = e => {
    this.setState({
      password: e.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    
    console.log('handling submit, state', this.state);

    try {
      axios.post('https://www.hackcity.dev/v1/user/login', {
        email: this.state.email,
        password: this.state.password,
      })
      .then((response) => {
        localStorage.setItem('jwt', response.data.user.token);
        localStorage.setItem('id', parseInt(response.data.user.ID));
        console.log('response in handleSubmit', response.data)
        this.props.handleAuthed(response.data.user.token, response.data.user.ID);
      })
      .catch((error) => {
        console.log(error);
      });
      
    } catch (e) {
      alert(e.message);
    }
  }

  handleIsAuthed = () => {
    this.props.history.push('/profile');
  }
  
  render() {
    if(this.props.isAuthed) {
      this.handleIsAuthed();
    }
    return (
      <div className="login-page-container overlay">
        <div className="login-form">
          <h2 className="bold">Login</h2>
          <p>Log in to your account and start sharing your sends!</p>
          <form onSubmit={this.handleSubmit}>
            <input 
              type="text" 
              name="email" 
              placeholder="Email Address"
              onChange={this.handleEmailChange.bind(this)}
              value={this.state.email} 
            />
            <input 
              type="password" 
              name="password" 
              placeholder="Password"
              onChange={this.handlePasswordChange.bind(this)}
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


export default withRouter(Login);