import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CommentAccordion from './CommentAccordion';

import './scss/RouteBox.scss';

class RouteBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      routeurl: '/route/'.concat(this.props.routeid),
      sendDate: new Date(this.props.sendDate),
      jwt: this.props.jwt,
      users: this.props.users
    }
  }

  render() {
    let comment;
    if(this.props.comments) {
      if(this.props.comments.length) {
        comment = <CommentAccordion comments={this.props.comments} jwt={this.state.jwt} users={this.state.users}/>;
      } else {
        comment = <div></div>;
      }
    } else {
      comment = <div></div>;
    }

    let imageUrl = "https://placekitten.com/400/300";
    if (this.props.imageUrl != '') {
      imageUrl = this.props.imageUrl;
    }

    return (
      <div className="single-box uk-width-1-1 uk-width-1-3@s">
        <Link to={this.state.routeurl}>
          <div className="container">
            <img src={imageUrl} alt="placeholder route" />
            <div className="text">
              <h2 className="bold">{this.props.name}</h2>
              <h4>V{this.props.grade}</h4>
              <h4>{this.state.sendDate.toDateString()}</h4>
              {comment}
            </div>
          </div>
        </Link>
      </div>
    );
  }
  
}

export default RouteBox;