import React, { Component } from 'react';
import { BrowserRouter as Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { BarLoader } from 'react-spinners';

import './scss/Profile.scss';

import RouteBox from '../general/RouteBox';
import ImageButton from '../general/ImageButton'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: [],
      user: {},
      email: '',
      name: '',
      id: this.props.id,
      imageLink: '',
      loading: true
    }
  }

  componentDidMount() {
    this.fetchRoutes();
    this.fetchUser();
  }

  handleRoutes = routes => {
    this.setState({
       routes: routes.reverse(),
       loading: false 
    });
  }

  handleUser = user => {
    this.setState({
      user: user,
      loading: false,
      imageLink: user.ImageUrl === '' ? '' : user.ImageUrl
    })
  }

  fetchRoutes = () => {
    let url = 'https://www.hackcity.dev/v1/user/' + this.props.id.toString() + '/routes';
    let authHeader = { "Authorization": "Bearer ".concat(this.props.jwt) }
    
    try {
      axios.get(url, {
        headers: authHeader
      })
      .then((res) => {
        this.handleRoutes(res.data.routes);
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
      })
    } catch (e) {
      alert(e);
    }
  }

  fetchUser = async () => {
    let url = 'https://www.hackcity.dev/v1/user/' + this.props.id.toString();
    let authHeader = { "Authorization": "Bearer ".concat(this.props.jwt) }

    try {
      await axios.get(url, {
        headers: authHeader
      })
      .then((res) => {
        this.handleUser(res.data.user);
        console.log('post-axios user gather:', this.state.user);
      })
      .catch((err) => {
        console.log(err);
      })
    } catch (e) {
      alert(e);
    }
  }

  calculateAverage = () => {
    let routeCount = this.state.routes.length;
    let routes = this.state.routes;
    let average = (routes.reduce((sum, route) => sum + parseInt(route.grade), 0) / routeCount).toFixed(2);
    return average;
  }

  calculateHighest = () => {
    let routes = this.state.routes;
    let highest = Math.max.apply(null, routes.map(function(route) {
      return parseInt(route.grade);
    }));
    return highest;
  }

  // TODO: OPTIMIZE THE SHIT OUT OF THIS
  calculateMostFrequentMonth = () => {
    let routes = this.state.routes;
    let monthNames = [ "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December" ];

    let monthCounts = routes.reduce(function(counts,route){
      let month = new Date(route.CreatedAt).getMonth();
      counts[month] = (counts[month] || 0) + 1;
      return counts;
    },{});
    return monthNames[Object.keys(monthCounts).find(key => monthCounts[key] === Math.max(...Object.values(monthCounts)))];;
  }

  // event handler for input, passed as a prop to the imagebutton component
  updateProfilePic = e => {
    // only grabs first file for now, set up to do multiple
    const file = e.target.files[0];
    if (file === undefined) {
      return
    }
    let formData = new FormData();
    formData.append("picture", file);

    let url = "https://www.hackcity.dev/v1/userpic/" + this.state.id;
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
    let imageLink = this.state.imageLink
    if(imageLink === "") {
      imageLink = "https://placekitten.com/250/250";
    }

    if (this.props.id > 0) {
      return (
        <div>
          <div className="uk-grid uk-grid-collapse profile-container">
            <div className="uk-width-1-1 uk-width-1-3@m uk-text-center uk-text-left@m profile bgtwo">
              <div className="uk-section">
                <h1 className="bold white">Profile</h1>
                <img className="avatar" src={imageLink} alt="placeholder avatar" />
                // STYLE MEEEEE
                <ImageButton updateProfilePicProp={this.updateProfilePic} />
                <h2 className="bold white">Jeff Hooton</h2>
                <p className="white"><span className="bold">Email:</span> jeffreyd@hooton.com</p>
                <div className="whiteline"></div>
                <h3 className="bold white">Statistics</h3>
                <p className="white"><span className="bold">Sends:</span> {this.state.routes.length}</p>
                <p className="white"><span className="bold">Average Difficulty of Route Sent:</span> V{this.calculateAverage()} </p>
                <p className="white"><span className="bold">Most Difficult Route Sent:</span> V{this.calculateHighest()} </p>
                <p className="white"><span className="bold">Most Active Month:</span> {this.calculateMostFrequentMonth()}</p>
              </div>
            </div>
            <div className="uk-width-1-1 uk-width-2-3@m routes">
              <div className="uk-section">
              <div className="uk-grid">
                  <div className="uk-width-1-1 uk-width-1-2@s uk-text-center uk-text-left@s">
                    <h1 className="bold">My Routes</h1>
                  </div>
                  <div className="uk-width-1-1 uk-width-1-2@s uk-text-center uk-text-right@s">
                    <Link to="/new-route" className="button brandone-outline">Add Route</Link>
                  </div>
                </div>
                <div className="uk-grid uk-grid-small" data-uk-grid="masonry: true">
                  {this.state.routes ?
                  this.state.routes.map((route, index) => (
                    <RouteBox key={index} name={route.name} grade={route.grade} sendDate={route.CreatedAt} comments={route.Comments} routeid={route.ID} jwt={this.props.jwt} userID={this.props.id} />
                  )) 
                  : <BarLoader color="#B60B31" />
                  }
                </div>
              </div>
            </div>
          </div>
          
        </div>
      );
    } else {
      return <Redirect to="/login" />;
    }
    
  }
}

export default Profile;