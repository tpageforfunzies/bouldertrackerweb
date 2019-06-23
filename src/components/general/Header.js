import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';

import './scss/Header.scss';
import bars from '../../assets/images/bars.png';

class Header extends Component  {

  render() {
    if(this.props.authed) {
      return (
        <div>
          <div className="header bgone">
            <div className="uk-navbar-left">
              <ul>
                <li>
                <Link to="/" className="white bold brand">
                  <h1 class="bold white">Boulder<br />Tracker</h1>
                </Link>
                </li>
              </ul>
            </div>
            <div className="uk-navbar-right">
              <ul>
                <li>
                  <Link to="/eventually/dir" className="white bold">Directory</Link>
                </li>
                <li>
                  <Link to="/eventually/fc" className="white bold">Followed Climbers</Link>
                </li>
                <li>
                  <Link to="/new-route" className="white bold">Add Route</Link>
                </li>
                <li>
                  <Link to="/eventually/hoc" className="white bold">Hall of Crush</Link>
                </li>
                <li>
                  <Link to="/profile" className="white bold">My Profile</Link>
                </li>
                <li>
                  <a className="button white-outline" onClick={this.props.handleLogout}>Logout</a>
                </li>
              </ul>       
            </div>
            <div className="offcanv-toggle">
              <a href="#offcanv" data-uk-toggle>
                <img src={bars} />
              </a>
            </div>
            <div id="offcanv" data-uk-offcanvas="flip: true">
              <div class="uk-offcanvas-bar">
                <div className="uk-grid uk-grid-collapse">
                  <div className="uk-width-2-3">
                    <h2 className="white bold">Boulder<br />Tracker</h2>
                  </div>
                  <div className="uk-width-1-3">
                    <button class="uk-offcanvas-close" type="button" data-uk-close></button>    
                  </div>
                </div>
                <div className="menu">
                  <ul>
                    <li>
                      <Link to="/eventually/dir" className="white bold">Directory</Link>
                    </li>
                    <li>
                      <Link to="/eventually/fc" className="oc-bt">Followed Climbers</Link>
                    </li>
                    <li>
                      <Link to="/new-route" className="oc-bt">Add Route</Link>
                    </li>
                    <li>
                      <Link to="/eventually/hoc" className="oc-bt">Hall of Crush</Link>
                    </li>
                    <li>
                      <Link to="/profile" className="oc-bt">My Profile</Link>
                    </li>
                    <li>
                      <a className="oc-bt" onClick={this.props.handleLogout}>Logout</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="header-spacer"></div>
        </div>
      );
    }

    return (
      <div className="header bgone">
        <div className="uk-navbar-left">
          <ul>
            <li>
              <Link to="/" className="white bold brand">
                <h1 class="bold white">Boulder<br />Tracker</h1>
              </Link>
            </li>
          </ul>
        </div>
        <div className="uk-navbar-right">
          <ul>
            <li>
              <Link to="/login" className="button white-outline">Login</Link>
            </li>
            <li>
              <Link to="/register" className="button white-outline">Register</Link>
            </li>
          </ul>       
        </div>
        <div className="offcanv-toggle">
          <a href="#offcanv" data-uk-toggle="flip: true;">
            <img src={bars} />
          </a>
        </div>
        <div id="offcanv" data-uk-offcanvas>
          <div class="uk-offcanvas-bar">
              <div className="uk-grid uk-grid-collapse">
                <div className="uk-width-2-3">
                  <h2 className="white bold">Boulder<br />Tracker</h2>
                </div>
                <div className="uk-width-1-3">
                  <button class="uk-offcanvas-close" type="button" data-uk-close></button>    
                </div>
              </div>
              <div className="menu">
                <ul>
                  <li>
                    <Link to="/login" className="oc-bt">Login</Link>
                  </li>
                  <li>
                    <Link to="/register" className="oc-bt">Register</Link>
                  </li>
                </ul> 
              </div>
              

          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);