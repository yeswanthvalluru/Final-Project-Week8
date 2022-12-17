import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../actions/authActions';

class Navbar extends Component {
  
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  
  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div className="navbar-fixed">
        <div className='logo-container'>
          <img src='./assets/images/icon.png' className='logo-img' alt='logo'/>
          <a className="logo-name">
              Free Chat
          </a>
        </div>

        {
          isAuthenticated && <button onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3">
              Logout
          </button>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);