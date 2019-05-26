import React, { Component } from 'react';
import { BrowserRouter as withRouter } from 'react-router-dom';
import axios from 'axios';

import CommentAccordion from '../general/CommentAccordion';

import './scss/SingleRoute.scss';

class SingleRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      route: {},
      id: this.props.id,
      jwt: localStorage.getItem('jwt')
    }

    this.fetchRoute();
    console.log('[SingleRoute] props >', this.props);
  }

  handleRoute = (route) => {
    this.setState({
      route: route
    });
  }

  fetchRoute = () => {
    let url = 'https://www.hackcity.dev/v1/route/'.concat(this.props.match.params.id);

    console.log(url)
    let authHeader = { "Authorization": "Bearer ".concat(this.state.jwt) };
    console.log(authHeader)

    try {
      axios.get(url, { headers: authHeader })
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

    console.log('[SINGLE ROUTE] THIS.STATE.ROUTE', this.state.route);

    if(this.state.route.Comments) {
      if(this.state.route.Comments.length > 0) {
        comments = (
          <CommentAccordion comments={this.state.route.Comments}/>
        );
      } else {
        comments = <div></div>;
      }
    } else {
      comments = <div></div>;
    }
    
    console.log('[SingleRoute] this.state.route', this.state.route);


    return (
      <div className="single-route-page">
        <div className="uk-section">
          <div className="gridl">
            <div className="single-route">
              <div className="uk-grid uk-grid-collapse">
                <div className="uk-width-1-1 uk-width-1-2 image">
                  <img src="https://placekitten.com/500/600" alt="single route placeholder" />
                </div>
                <div className="uk-width-1-1 uk-width-1-2 data">
                  <h2 className="bold black">{this.state.route.name}</h2>
                  <h4 className="black">V{this.state.route.grade}</h4>
                  {comments}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleRoute;