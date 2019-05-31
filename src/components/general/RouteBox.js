import React, { Component } from 'react';
import { BrowserRouter as Link } from 'react-router-dom';
import CommentAccordion from './CommentAccordion';

import './scss/RouteBox.scss';

class RouteBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      routeurl: '/route/'.concat(this.props.routeid),
      sendDate: new Date(this.props.sendDate)
    }
  }

  render() {
    let comment;
    if(this.props.comments) {
      if(this.props.comments.length) {
        comment = <CommentAccordion comments={this.props.comments}/>;
      } else {
        comment = <div></div>;
      }
    } else {
      comment = <div></div>;
    }

    return (
      <div className="single-box uk-width-1-1 uk-width-1-3@s">
          <div className="container">
            <img src="https://placekitten.com/400/300" alt="placeholder route" />
            <div className="text">
              <Link className="bold routelink" jwt={this.props.jwt} userID={this.props.id} to={this.state.routeurl}>{this.props.name}</Link>
              <h4>V{this.props.grade}</h4>
              <h4>{this.state.sendDate.toDateString()}</h4>
              {comment}
            </div>
          </div>
      </div>
    );
  }
  
}

export default RouteBox;