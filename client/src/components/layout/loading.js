import React, { Component } from 'react';

export default class Loading extends Component {
    render() {
        const { active } = this.props;

        return (
            <div className='loading' style={{
                display: active ? 'flex' : 'none'
            }}>
                Loading...
            </div>
        )
    }
}