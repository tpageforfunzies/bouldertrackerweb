import React, { Component } from 'react';

function RouteBox(props) {
  return (
    <div className="single-box uk-width-1-1 uk-width-1-3@m">
      <img src="https://placekitten.com/400/300" />
      <div className="text">
        <h2 className="bold">{props.name}</h2>
        <h4>{props.grade}</h4>
      </div>
    </div>
  );
}

export default RouteBox;