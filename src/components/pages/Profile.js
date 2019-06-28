import React, { Component } from 'react';
import { BrowserRouter as Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { BarLoader } from 'react-spinners';

import './scss/Profile.scss';

import Add from '../../assets/images/add.png';

import RouteBox from '../general/RouteBox';
import ImageButton from '../general/ImageButton'
import store from '../../store';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: [],
      user: {},
      users: {},
      email: '',
      name: '',
      id: this.props.id,
      jwt: this.props.jwt,
      imageLink: '',
      loading: true
    }
  }

  componentDidMount() {
    this.fetchUsers();
    this.fetchRoutes();
    this.fetchUser();
    console.log('componentDidMount()')
  }

  handleRoutes = routes => {
    let oldstate = this.state;
    this.setState({
      ...oldstate,
       routes: routes.reverse()
    });
    console.log('handleRoutes()')
  }

  handleUser = user => {
    this.setState({
      user: user,
      imageLink: user.ImageUrl === '' ? '' : user.ImageUrl
    })
    console.log('handleUser()')
  }

  handleUsers = users => {
    let userMap = {}
    let oldstate = this.state;

    users.map((user, i, a) => {
      userMap[user.ID] = user.name;
    })

    this.setState({...oldstate,
      users: userMap,
      loading: false
    })
    console.log('handleUsers()')
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
    console.log('fetchRoutes()')
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
      })
      .catch((err) => {
        console.log(err);
      })
    } catch (e) {
      alert(e);
    }
    console.log('fetchUser()')
  }

  fetchUsers = () => {
    let url = 'https://www.hackcity.dev/v1/users';
    let authHeader = { "Authorization": "Bearer ".concat(this.props.jwt) }

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
    console.log('fetchUsers()')
  }

  calculateAverage = () => {
    let routeCount = this.state.routes.length;
    let routes = this.state.routes;
    let average = (routes.reduce((sum, route) => sum + parseInt(route.grade), 0) / routeCount).toFixed(2);
    console.log('calculateAverage()')
    return average;
  }

  calculateHighest = () => {
    let routes = this.state.routes;
    let highest = Math.max.apply(null, routes.map(function(route) {
      return parseInt(route.grade);
    }));
    console.log('calculateHighest()')
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
    console.log('calculateMostFrequentMonth()')
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
    console.log('updateProfilePic()')
  }

  shouldComponentUpdate(nextprops, nextstate) {
    return nextstate.imageLink == '';
  }

  render() {
    console.log('render()')

    if (this.state.loading == true) {
      return null;
    }

    let imageLink = this.state.imageLink;

    if(imageLink === "") {
      imageLink = "https://placekitten.com/250/250";
    }

    console.log('imagelink', imageLink);

    if (this.props.id > 0 || store.get('id') > 0) {
      return (
        <div>
          <div className="uk-grid uk-grid-collapse profile-container">
            <div className="uk-width-1-1 uk-width-1-6@m uk-text-center uk-text-left@m profile bgtwo">
              <div className="uk-section">
                <h1 className="bold white">Profile</h1>
                <img className="avatar" src={imageLink} alt="placeholder avatar" />
                
                <ImageButton updatePic={this.updateProfilePic} title="Change Avatar" />
                <h2 className="bold white">{this.state.user.name}</h2>
                <p className="white"><span className="bold">Email:</span> {this.state.user.email}</p>
                <div className="whiteline"></div>
                <h3 className="bold white">Statistics</h3>
                <p className="white"><span className="bold">Sends:</span> {this.state.routes.length}</p>
                <p className="white"><span className="bold">Average Difficulty:</span> V{this.calculateAverage()} </p>
                <p className="white"><span className="bold">Most Difficult:</span> V{this.calculateHighest()} </p>
                <p className="white"><span className="bold">Most Active Month:</span> {this.calculateMostFrequentMonth()}</p>
              </div>
            </div>
            <div className="uk-width-1-1 uk-width-5-6@m routes bgone">
              <div className="uk-section">
                <div className="uk-grid">
                  <div className="uk-width-1-1 uk-width-1-2@m left uk-text-center uk-text-left@s">
                    <div className="uk-grid uk-grid-collapse">
                      <div className="uk-width-2-3 uk-text-left">
                        <h1 className="bold white">My Routes</h1>
                      </div>
                      <div className="uk-width-1-3 uk-text-right">
                        <Link to="/new-route" className="add-button">
                          <img src={Add} />
                        </Link>
                      </div>
                    </div>

                    <div className="uk-grid uk-grid-small" data-uk-grid="masonry: true">
                      {this.state.routes ?
                      this.state.routes.map((route, index) => (
                        <RouteBox key={index} name={route.name} grade={route.grade} sendDate={route.CreatedAt} comments={route.Comments} routeid={route.ID} imageUrl={route.ImageUrl} jwt={this.state.jwt} userID={this.props.id} users={this.state.users} />
                      )) 
                      : <BarLoader color="#B60B31" />
                      }
                    </div>
                  </div>
                  <div className="uk-width-1-1 uk-width-1-2@m right uk-text-center uk-text-right@s">
                  <div className="uk-grid uk-grid-collapse">
                      <div className="uk-width-1-1 uk-text-left">
                        <h1 className="bold white">My Feed...coming soon</h1>
                      </div>
                    </div>
                    
                    {/* <div className="uk-grid uk-grid-small" data-uk-grid="masonry: true">
                      {this.state.routes ?
                      this.state.routes.map((route, index) => (
                        <RouteBox key={index} name={route.name} grade={route.grade} sendDate={route.CreatedAt} comments={route.Comments} routeid={route.ID} routeuserid={route.user_id} imageUrl={route.ImageUrl} jwt={this.state.jwt} userID={this.props.id} users={this.state.users}/>
                      )) 
                      : <BarLoader color="#B60B31" />
                      }
                    </div> */}
                  </div>
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