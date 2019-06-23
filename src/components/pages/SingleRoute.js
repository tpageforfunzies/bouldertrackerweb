import React, { Component } from 'react';
import { BrowserRouter as withRouter } from 'react-router-dom';
import axios from 'axios';

import CommentAccordion from '../general/CommentAccordion';
import ImageButton from '../general/ImageButton'

import './scss/SingleRoute.scss';
import { BarLoader } from 'react-spinners';
import StarRatings from 'react-star-ratings/build/star-ratings';

class SingleRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      route: {},
      id: this.props.match.params.id,
      jwt: this.props.jwt,
      authed: this.props.isAuthed,
      comment: '',
      users: {},
      loading: true,
      imageLink: ''
    }
  }

  componentDidMount() {
    this.fetchRoute();
    this.fetchUsers();
    // this.setState({
    //   loading: false
    // })
  }

  handleRoute = (route) => {
    this.setState({
      route: route,
      imageLink: route.ImageUrl
    });
  }

  fetchRoute = async () => {
    let url = 'https://www.hackcity.dev/v1/route/'.concat(this.state.id);

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

  handleUsers = users => {
    let userMap = {}
    users.map((user, i, a) => {
      userMap[user.ID] = user.name;
    })
    this.setState({
      users: userMap,
      loading: false
    })
  }

  fetchUsers = () => {
    let url = 'https://www.hackcity.dev/v1/users';
    let authHeader = { "Authorization": "Bearer ".concat(this.state.jwt) }

    try {
      axios.get(url, {
        headers: authHeader
      })
      .then((res) => {
        this.handleUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      })
    } catch (e) {
      alert(e);
    }
  }

  handleCommentChange = e => {
    this.setState({
      comment: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let authHeader = { "Authorization": "Bearer ".concat(this.state.jwt) };
    console.log(authHeader);

    try {
      axios({
        method: 'post',
        url: "https://www.hackcity.dev/v1/comment/new",
        headers: authHeader,
        data: {
          user_id: parseInt(this.props.userid),
          route_id: this.state.route.ID,
          content: this.state.comment
        }
      })
      .then((res) => {
        console.log('[SingleRoute] Comment submit success', res.data);
        this.fetchRoute();
      })
      .catch((err) => {
        console.log(err);
        console.log('[SingleRoute] Comment submit failure', err.message);
      })
    } catch(e) {
      console.log(e);
    }
  }

  // event handler for input, passed as a prop to the imagebutton component
  updateRoutePic = e => {
    // only grabs first file for now, set up to do multiple
    const file = e.target.files[0];
    if (file === undefined) {
      return
    }
    let formData = new FormData();
    formData.append("picture", file);

    let url = "https://www.hackcity.dev/v1/routepic/" + this.state.id;
    axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": "Bearer ".concat(this.props.jwt)
        }
      })
    .then((res) => {
      this.setState({ imageLink: res.data })
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    if (this.state.loading == true) {
      return null;
    }

    let imageLink = this.state.imageLink
    if(imageLink === "") {
      imageLink = "https://placekitten.com/500/600";
    }

    let comments;
    let commentform = (
      <div className="comment-form-container">
        <form onSubmit={this.handleSubmit} className="comment-form">
          <div className="uk-grid uk-grid-collapse">
            <div className="uk-width-2-3">
              <input 
                type="text" 
                name="comment" 
                placeholder="Leave a comment"
                onChange={this.handleCommentChange.bind(this)}
                value={this.state.comment} 
              />
            </div>
            <div className="uk-width-1-3">
              <input 
                type="submit" 
                value="Post" 
              />
            </div>
          </div>
          
          
        </form>
      </div>
    )

    if(this.state.route.Comments) {
      if(this.state.route.Comments.length > 0) {
        comments = (
          <CommentAccordion comments={this.state.route.Comments} jwt={this.state.jwt} users={this.state.users}/>
        );
      } else {
        comments = <div>
          <p>No comments yet</p>
        </div>;
      }
    } else {
      comments = <div><p>No comments yet</p></div>;
    }

    return (
      <div className="single-route-page">
        <div className="uk-section">
          <div className="gridl">
            {this.state.route ? (
              <div className="single-route">
                <div className="uk-grid uk-grid-collapse">
                  <div className="uk-width-1-1 uk-width-1-2@m image">
                    <img src={imageLink} alt="single route placeholder" />
                    <ImageButton updatePic={this.updateRoutePic} title="Change Picture" />
                  </div>
                  <div className="uk-width-1-1 uk-width-1-2@m data">
                    <h2 className="bold black">{this.state.route.name}</h2>
                    <h4 className="black grade">V{this.state.route.grade}</h4>
                    {this.state.route.star_rating ? (
                      <StarRatings rating={this.state.route.star_rating} starRatedColor="#3C62D4" />
                    ) : (
                      <h4 className="bold color-one">Problem not rated</h4>
                    )
                    }
                    {this.state.route.star_rating ? (
                      <h4 className="black"><span className="bold">Problem Style:</span>{this.state.route.style}</h4>
                    ) : (
                      <h4 className="color-one">Problem style not entered</h4>
                    )
                    }
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