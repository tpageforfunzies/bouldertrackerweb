import React, { Component } from 'react';
import axios from 'axios';

import './scss/Register.scss';
import { BrowserRouter as Redirect, withRouter } from 'react-router-dom';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthed: false,
      name: '',
      email: '',
      password: ''
    }
  }

  handleNameChange = e => {
    this.setState({
      name: e.target.value
    });
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

    try {
      axios.post('https://www.hackcity.dev/v1/user/new', {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
      .then((response) => {
        localStorage.setItem('jwt', response.data.user.token);
        localStorage.setItem('id', parseInt(response.data.user.ID));
        this.props.handleAuthed(response.data.user.token, response.data.user.ID);
      })
      .catch(function (error) {
        console.log(error);
      });
      
    } catch (e) {
      alert(e.message);
    }
  }

  handleIsAuthed = () => {
    this.props.history.push('/');
  }

  render() {
    if(this.state.isAuthed) {
      this.handleIsAuthed();
    } else {
      return (
        <div className="register-page-container overlay">
  
          <div className="login-form">
            <h2 className="bold">Register</h2>
            <p>Create an account to post routes, follow your favorite climbers, find new climbers to follow and interact with your friends sends!</p>
            <form onSubmit={this.handleSubmit}>
              <input 
                type="text" 
                name="name"  
                onChange={this.handleNameChange.bind(this)} 
                value={this.state.name}
                placeholder="Your name" 
              />
              <input 
                type="email" 
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
                value="Register" 
              />
            </form>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(Register);