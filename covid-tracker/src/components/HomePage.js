import React from "react";
import Survey from "./Survey.js";
import { Button } from "react-bootstrap";
import firebase from "firebase";

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showSurvey: false };
  }

  render() {
    return (
      <div className="homePage">
        {!this.state.showSurvey
          ? (<span>
            <div>Signed In!</div>
            <Button onClick={() => firebase.auth().signOut()}>Sign Out!</Button>
            <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
            <button onClick={() => this.setState({ showSurvey: true })}>Track Your Symptoms</button>
          </span>)
          : (<Survey showSurvey={this.state.showSurvey} submit={() => this.setState({ showSurvey: false })} />)
        }
      </div>
    );
  }
}
