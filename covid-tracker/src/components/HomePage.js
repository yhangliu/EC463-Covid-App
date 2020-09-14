import React from "react";
import Survey from "./Survey.js";
import { Button } from "react-bootstrap";
import firebase from "firebase";
import Dashboard from "./Dashboard.js"

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      showSurvey: false,
      showDashboard: false,
      showWelcome: true 
    };
  }

  render() {
    const {showDashboard, showSurvey, showWelcome} = this.state;
    let welcomePage = (<span>
      <div>Signed In!</div>
      <Button onClick={() => firebase.auth().signOut()}>Sign Out!</Button>
      <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
      <button onClick={() => this.setState({ showSurvey: true, showWelcome: false})}>Track Your Symptoms</button>
      <button onClick ={() => this.setState({ showDashboard: true, showWelcome: false})}>Admin Dashboard</button>
    </span>);

    let surveyPage = (<Survey showSurvey={this.state.showSurvey} submit={() => this.setState({ showSurvey: false, showWelcome: true})} />);

    let dashboardPage = (<Dashboard showDashboard={this.state.showDashboard} backToHome={() => this.setState({ showDashboard: false, showWelcome: true})} />)

    let display;

    if (showSurvey) {
      display = surveyPage;
    } else if (showDashboard) {
      display = dashboardPage;
    } else {
      display = welcomePage;
    }

    return (
      <div className="homePage">
       {display}
      </div>
    );
  }
}
