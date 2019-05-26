import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Header from './components/general/Header';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Profile from './components/pages/Profile';
import PostRoute from './components/pages/PostRoute';
import SingleRoute from './components/pages/SingleRoute';

import './assets/scss/general.scss';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authed: false,
      jwt: '',
      id: 0
    }
  }

  checkAuth = () => {
    console.log('CHECKING AUTH');
    let jwt = localStorage.getItem('jwt');
    if(jwt) {
      if(localStorage.getItem('jwt')) {
        console.log('JWT FOUND');
        this.setState({
          authed: true,
          jwt: jwt,
          id: localStorage.getItem('id')
        });
      }
    }
  }

  handleAuthed = (jwt,id) => {
    this.setState({
      jwt: jwt,
      id: id,
      authed: true
    });
    return <Redirect to="/" />;
  }

  handleLogout = () => {
    localStorage.setItem('jwt', null);
    localStorage.setItem('id', null);

    this.setState({
      authed: false,
      jwt: ''
    });
  }

  render() {
    return (
      <Router>
        <div>
          
          <Header authed={this.state.authed} jwt={this.state.jwt} handleLogout={this.handleLogout} />

          <Route exact path="/" render={() => <Home isAuthed={this.state.authed} jwt={this.state.jwt} id={this.state.id} />} />

          <Route exact path="/login" render={() => <Login isAuthed={this.state.authed} handleAuthed={this.handleAuthed}/>} />

          <Route exact path="/register" render={() => <Register isAuthed={this.state.authed} handleAuthed={this.handleAuthed}/>} />

          <Route exact path="/profile" render={() => <Profile id={this.state.id} jwt={this.state.jwt} />} />

          <Route exact path="/new-route" render={() => <PostRoute id={this.state.id} jwt={this.state.jwt} />} />

          <Route path="/route/:id" render={() => <SingleRoute id={this.state.id} jwt={this.state.jwt} />} />

        </div>
      </Router>
    );
  }
}

export default App;
