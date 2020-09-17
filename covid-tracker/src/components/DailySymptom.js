import React, { Component } from 'react';

export default class DailySymptom extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() { //renders total of each symptom
        
        return (
            <div className="symptoms-div">
                <p>{this.props.symptom}: {this.props.count}</p>
            </div>
        );
    }
}