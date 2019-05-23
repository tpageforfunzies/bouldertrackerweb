import React, { Component } from 'react';
import axios from 'axios';

import './Register.scss';
import Header from '../general/Header';

export default class Register extends Component {
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

  handleAuthed = () => {
    this.setState({
      isAuthed: !this.state.isAuthed
    })
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
        this.handleAuthed();
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
          <h2 className="bold">Register</h2>
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
              value="Submit" 
            />
          </form>
        </div>
      </div>
    )
  }
}