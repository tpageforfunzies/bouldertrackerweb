import React, { Component } from 'react';
import { BrowserRouter as Link } from 'react-router-dom';

import './scss/RouteBox.scss';

function RouteBox(props) {
  var routeurl = '/route/'.concat(props.id);

  return (
    <div className="single-box uk-width-1-1 uk-width-1-3@s ">
      <div className="container">
        <img src="https://placekitten.com/400/300" />
        <div className="text">
          <h2 className="bold">{props.name}</h2>
          <h4>{props.grade}</h4>
        </div>
      </div>
    </div>
  );
}

export default RouteBox;