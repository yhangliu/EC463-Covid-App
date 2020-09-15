import React, { Component } from 'react';

export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        
        return (
            <div className="user-div">
                <h1>{this.props.fullName}</h1>
                <p>Last Submitted on {this.props.lastSubmitted}</p>
            </div>
        );
    }
}