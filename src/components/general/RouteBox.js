import React from 'react';
import { BrowserRouter as Link } from 'react-router-dom';
import CommentAccordion from './CommentAccordion';

import './scss/RouteBox.scss';

function RouteBox(props) {
  var routeurl = '/route/'.concat(props.routeid);
  let sendDate = new Date(props.sendDate);
  let comment;

  if(props.comments) {
    if(props.comments.length) {
      comment = <CommentAccordion comments={props.comments}/>;
    } else {
      comment = <div></div>;
    }
  } else {
    comment = <div></div>;
  }

  console.log('[RouteBox] props', props);

  return (
    <div className="single-box uk-width-1-1 uk-width-1-3@s">
      <a href={routeurl} >
        <div className="container">
          <img src="https://placekitten.com/400/300" alt="placeholder route" />
          <div className="text">
            <h2 className="bold">{props.name}</h2>
            <h4>V{props.grade}</h4>
            <h4>{sendDate.toDateString()}</h4>
            {comment}
          </div>
        </div>
      </a>
    </div>
  );
}

export default RouteBox;