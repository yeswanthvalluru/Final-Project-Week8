import React, { Component } from 'react';
import moment from 'moment';

class Message extends Component {

    render() {
      const { name, content, time } = this.props;
      
      return (
        <div className='message'>
          <div className='name-oneletter'>{name[0]}</div>
          <div className='message-content'>
            <div>{content}</div>
            <div className='time'>{name} {moment(time).format('YYYY.MM.DD HH:mm:SS')}</div>
          </div>
        </div>
      );
    }

}

export default Message;