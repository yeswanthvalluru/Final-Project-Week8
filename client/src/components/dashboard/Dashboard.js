import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logoutUser } from './../../actions/authActions';
import { 
  addServer,
  getServers,
  removeServer,
  addMessage,
  getMessages
} from './../../actions/messageActions';

import Message from '../chat/Message';
import Server from '../chat/Server';
import Loading from '../layout/loading';
import axios from 'axios';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeServer: null,
      activeServerCreator: null,
      postMessage: '',
      weather: 'Clear'
    }

    const options = {
      method: "GET",
      url: "https://bestweather.p.rapidapi.com/weather/1600%20Pennsylvania%20Avenue%20NW%20Washington,%20D.C/today",
      params: { unitGroup: "us" },
      headers: {
        "X-RapidAPI-Key": "91c2a3779emsh5fff6ee11376102p12dbc2jsn68b697bd0d6b",
        "X-RapidAPI-Host": "bestweather.p.rapidapi.com",
      },
    };

    axios.request(options).then((response) => {
      const weather = response.data.currentConditions.conditions;

      this.setState({
        weather
      })
    }).catch(function (error) {
      alert("Weather API can't be called.");
    });
  }

  onAddServerClick = () => {
    let serverName = prompt("Please enter server name:", "My Server");
    if (serverName === null || serverName === "") {
      return;
    }
    this.props.addServer(serverName);
  }

  removeServer = () => {
    this.props.removeServer(this.state.activeServer);
    this.setState({
      activeServer: null
    })
  }

  componentDidMount() {
    this.props.getServers();
  }

  setActiveServer = (id, user_id) => {
    this.setState({
      activeServer: `${id}`,
      activeServerCreator: user_id
    });

    this.props.getMessages(id);
    this.setState({
      postMessage: ''
    });
  }

  postMessage = () => {
    const { activeServer, postMessage } = this.state;

    if (activeServer === null) {
      alert('Select server!');
      return;
    }
    if (postMessage.length === 0) {
      alert('Input message!');
      return;
    }

    this.props.addMessage(
      activeServer, 
      postMessage
    );

    this.setState({
      postMessage: ''
    });
  }

  onChangePostMessage = (e) => {
    this.setState({
      postMessage: e.target.value
    });
  }

  render() {
    const { user } = this.props.auth;
    const { messages, servers, loading } = this.props.message;
    const { weather } = this.state;

    return (
      <div className='dashboard-container'>
        <Loading active={loading}/>
        <div className='weather'>Washington weather: <b>{weather}</b></div>

        <div className='sidebar-container'>
          <div className='server-container'>
            {
              servers.map((server, index) => <Server 
                name={server.server_name}
                id={server._id}
                userId={server.user_id}
                key={index}
                active={this.state.activeServer === server._id}
                onServerClick={this.setActiveServer}
              />)
            }
            <div className='server-footer'>
              <button className='btn waves-effect waves-light hoverable blue accent-3' 
                style={{marginRight: 10, marginLeft: 10}}
                onClick={this.onAddServerClick}
              >
                Add
              </button>
              {
                this.state.activeServerCreator === user.id &&
                <button className='btn waves-effect waves-light hoverable blue accent-3' 
                  style={{marginLeft: 10, marginRight: 10}}
                  onClick={this.removeServer}>
                    Remove
                </button>
              }
            </div>
        </div>
        </div>
        <div className='messages'>
          <div className='messages-container'>
            {
              messages.map((message, index) => <Message 
                key={index} 
                name={message.user_name}
                content={message.message}
                time={message.time}/>)
            }
          </div>
          <div className='messages-footer'>
            <input placeholder='Type your message here.' onChange={this.onChangePostMessage} value={this.state.postMessage}/>
            <button className='btn waves-effect waves-light hoverable blue accent-3'
              onClick={this.postMessage}>
              POST
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  message: state.message
});


export default connect(
  mapStateToProps,
  { 
    logoutUser,

    addServer,
    removeServer,
    getServers,
    addMessage,
    getMessages
  }
)(Dashboard);