import React, { Component } from 'react';

class Server extends Component {
    render() {
      const { active, name, id, userId, onServerClick } = this.props;
  
      return (
        <div 
          className={`server ${active ? 'active' : ''}`}
          onClick={() => {
            onServerClick(id, userId)
          }}>
          {name}
        </div>
      )
    }
}

export default Server;