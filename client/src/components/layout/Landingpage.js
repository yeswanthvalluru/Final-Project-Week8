import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class LandingPage extends Component {
  componentDidMount() {
    // If logged in and user navigates to login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashbaord');
    }
  }

  render() {
    return (
      <div style={{ height: '85vh' }} className='container valign-wrapper'>
        <div className='row'>
          <div className='col s12 center-align landing-container'>
            <h4>
              <b>Create</b> your own server and <span style={{ fontFamily: 'poppins' }}>Start</span> Messaging!
            </h4>
            <br />
            <div className='col s12'>
              <Link to='/login' style={{ width: '300px', borderRadius: '5px', letterSpacing: '1.5px' }} className='btn btn-large waves-effect waves-light hoverable blue accent-3'>
                Log In
              </Link>
            </div>
            <div className='col s12'>
              <Link to="/register" style={{ width: '300px', borderRadius: '5px', letterSpacing: '1.5px', marginTop: 20 }} className='btn btn-large waves-effect waves-light hoverable blue accent-3'>
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps
)(LandingPage);