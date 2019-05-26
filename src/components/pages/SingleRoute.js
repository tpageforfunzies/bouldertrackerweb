import React, { Component } from 'react';
import axios from 'axios';

class SingleRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      route: {},
      id: this.props.id
    }

    this.fetchRoute();
  }

  handleRoute = (route) => {
    this.setState({
      route: route
    });
    console.log('[SingleRoute] route pushed to state', this.state.route);
  }

  fetchRoute = () => {
    let url = 'https://www.hackcity.dev/v1/route/'.concat(this.state.id);
    let authHeader = { "Authorization": "Bearer ".concat(this.props.jwt) };

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

    if(route.Comments.length) {
      comments = (
        <CommentAccordion comments={this.state.route.Comments}/>
      );
    } else {
      comments = <div></div>;
    }

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
                  <h4 className="black">{this.state.route.grade}</h4>
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