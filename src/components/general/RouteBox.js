import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CommentAccordion from './CommentAccordion';

import Comment from '../../assets/images/comment.png';

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

      <div className="single-box uk-width-1-1">
        <Link to={this.state.routeurl}>
          <div className="container bgtwo">
            <div className ="uk-grid uk-grid-collapse">
              <div className="uk-width-1-5 image">
                <img src={imageUrl} />
              </div>
              <div className="left-container uk-text-left uk-width-3-5">
                <h2 className="bold">{this.props.name}</h2>
                <span className="sent">
                  {this.state.sendDate.toDateString()}
                </span>
              </div>
              <div className="right-container uk-width-1-5">
                <span className="grade">
                  V{this.props.grade}
                </span>
                <br></br>
                <span className="comments">
                  {this.props.comments.length}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
  
}

export default RouteBox;