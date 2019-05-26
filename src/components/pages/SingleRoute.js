import React, { Component } from 'react';
import { BrowserRouter as withRouter } from 'react-router-dom';
import axios from 'axios';

import CommentAccordion from '../general/CommentAccordion';

import './scss/SingleRoute.scss';
import { BarLoader } from 'react-spinners';

class SingleRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      route: {},
      id: this.props.id,
      jwt: localStorage.getItem('jwt'),
      comment: ''
    }

    this.fetchRoute();
    console.log('[SingleRoute] props >', this.props);
  }

  handleRoute = (route) => {
    this.setState({
      route: route
    });
  }

  fetchRoute = async () => {
    let url = 'https://www.hackcity.dev/v1/route/'.concat(this.props.match.params.id);

    console.log(url)
    let authHeader = { "Authorization": "Bearer ".concat(this.state.jwt) };
    console.log(authHeader)

    try {
      await axios.get(url, { headers: authHeader })
      .then((res) => {
        console.log(res);
        this.handleRoute(res.data.route);
      })
      .catch((err) => {
        console.log(err);
      })
    } catch(e) {
      console.log(e);
    }

  }

  handleCommentChange = (e) => {
    this.setState({
      comment: e.target.value
    });
  }

  handleCommentSubmit = () => {
    let url = 'https://www.hackcity.dev/v1/comment/new';
    let authHeader = { "Authorization": "Bearer ".concat(this.props.jwt) };

    try {
      axios({
        method: 'post',
        url: url,
        headers: authHeader,
        data: {
          user_id: this.state.id,
          route_id: this.state.route.ID,
          comment: this.state.comment
        }
      })
      .then((res) => {
        console.log(res);
        this.handleRoute(res.data.route);
      })
      .catch((err) => {
        console.log(err);
      })
    } catch(e) {
      console.log(e);
    }
  }

  render() {
    let comments;
    let commentform = (
      <div className="comment-form-container">
        <form onSubmit={this.handleCommentSubmit} className="comment-form">
          <input 
            type="text" 
            name="comment" 
            placeholder="Leave a comment!"
            onChange={this.handleCommentChange.bind(this)}
            value={this.state.comment} 
          />
          <input 
            type="submit" 
            value="Submit" 
          />
        </form>
      </div>
    )

    if(this.state.route.Comments) {
      if(this.state.route.Comments.length > 0) {
        comments = (
          <CommentAccordion comments={this.state.route.Comments}/>
        );
      } else {
        comments = <div>
          <p>No comments yet</p>
        </div>;
      }
    } else {
      comments = <div><p>No comments yet</p></div>;
    }
    
    console.log('[SingleRoute] this.state.route', this.state.route);


    return (
      <div className="single-route-page">
        <div className="uk-section">
          <div className="gridl">
            {this.state.route ? (
              <div className="single-route">
                <div className="uk-grid uk-grid-collapse">
                  <div className="uk-width-1-1 uk-width-1-2 image">
                    <img src="https://placekitten.com/500/600" alt="single route placeholder" />
                  </div>
                  <div className="uk-width-1-1 uk-width-1-2 data">
                    <h2 className="bold black">{this.state.route.name}</h2>
                    <h4 className="black">V{this.state.route.grade}</h4>
                    {comments}
                    {commentform}
                  </div>
                </div>
              </div>
            )

              :
              <BarLoader />
            }
            
          </div>
        </div>
      </div>
    );
  }
}

export default SingleRoute;