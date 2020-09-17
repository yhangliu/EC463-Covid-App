import React, { Component } from 'react';
import "../css/user.css";
export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        
        return (
            <div className="user-div">
                <h2>{this.props.fullName}</h2>
                <p>Last Submitted on {this.props.lastSubmitted}</p>
            </div>
        );
    }
}