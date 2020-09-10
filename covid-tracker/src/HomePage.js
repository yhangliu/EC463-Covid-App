import React from "react";
import Survey from "./Survey.js";
import {Button} from "react-bootstrap";

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showSurvey: false};
  }

  render() {
    return (
      <div className="homePage">
        {!this.state.showSurvey
          ? (<span>
              <div>Signed In!</div>
              <Button onClick={this.props.signOut}>Sign Out!</Button>
              <h1>Welcome {this.props.userName}</h1>
              <button onClick={() => this.setState({showSurvey: true})}>Track Your Symptoms</button>
            </span>)
          : (<Survey showSurvey={this.state.showSurvey} submit={() => this.setState({showSurvey: false})} />)
        }
      </div>
    );
  }
}