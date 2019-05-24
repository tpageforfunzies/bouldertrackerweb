import React, { Component } from 'react';
import { BrowserRouter as Redirect } from 'react-router-dom';
import axios from 'axios';

import './PostRoute.scss';

class PostRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      grade: '',
      id: this.props.id,
      error: false,
      goBack: false
    }
  }

  handleNameChange = e => {
    this.setState({
      name: e.target.value
    });
  }

  handleGradeChange = e => {
    this.setState({
      grade: e.target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    let header = { "Authorization": "Bearer ".concat(this.props.jwt) };
    console.log('header', header);
    try {
      axios({
        method: 'post',
        url: 'https://www.hackcity.dev/v1/route/new',
        headers: header,
        data: {
          name: this.state.name,
          grade: this.state.grade,
          user_id: this.state.id 
        }
      })
      .then((res) => {
        console.log(res.data);
        this.setState({
          goBack: true
        })
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          error: true,
          goBack: false
        })
      });
    } catch(err) {
      console.log(err);
    }
  }

  render() {
    if (this.props.id > 0) {
      if (this.state.goBack) {
        return <Redirect to='/profile' />;
      } else {
        return (
          <div className="add-form">
            <h2 className="bold">Add Route</h2>
            <form onSubmit={this.handleSubmit}>
              <input 
                type="text" 
                name="name" 
                placeholder="Route Name"
                onChange={this.handleNameChange.bind(this)}
                value={this.state.email} 
              />
              <input 
                type="text" 
                name="grade" 
                placeholder="Route Grade"
                onChange={this.handleGradeChange.bind(this)}
                value={this.state.password} 
              />
              <input 
                type="submit" 
                value="Submit" 
              />
            </form>
          </div>
        );
      }
      
    } else {
      return <Redirect to="/login" />;
    }
    
  }
}

export default PostRoute;