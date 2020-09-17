import React from "react";
import Survey from "./Survey.js";
import { Button } from "react-bootstrap";
import firebase from "firebase";
import Dashboard from "./Dashboard.js"
import { getData } from '../api';
import Info from '../components/Stats/Info';
import "../css/homepage.css"

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      showSurvey: false,
      showDashboard: false,
      showWelcome: true
    };
    this.apiCall();
    this.writeUserData();
  }

  async apiCall() { //get api data
    const gotData = await getData();
    this.setState({ data: gotData })
  }

  writeUserData() { //create inital profile in firebase database
    firebase.database().ref('users/' + firebase.auth().currentUser.uid).once("value", snapshot => {
      if (!snapshot.exists()) {
        firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
          full_name: firebase.auth().currentUser.displayName,
          last_submitted: 'N/A (New User)'
        });
      }
    })
  }

  adminPrompt() { //prompt for admin key to access dashboard
    let admin = prompt("Please enter Admin Key");
    if (admin === process.env.REACT_APP_ADMIN_KEY) {
      this.setState({ showDashboard: true, showWelcome: false })
    } else {
      alert("You do not have permission to access this");
    }
  }

  render() {
    const { data } = this.state;
    const { showDashboard, showSurvey } = this.state;
    let welcomePage = (<div className="homepage">
      <h1>Welcome, {firebase.auth().currentUser.displayName}</h1>
      <button onClick={() => this.setState({ showSurvey: true, showWelcome: false })}>Track Your Symptoms</button>
      <button onClick={() => this.adminPrompt()}>Admin Dashboard</button>
      <Info data={data} />
      <Button onClick={() => firebase.auth().signOut()}>Sign Out</Button>

    </div>);

    let surveyPage = (<Survey showSurvey={this.state.showSurvey} submit={() => this.setState({ showSurvey: false, showWelcome: true })} />);

    let dashboardPage = (<Dashboard showDashboard={this.state.showDashboard} backToHome={() => this.setState({ showDashboard: false, showWelcome: true })} />)

    let display;

    if (showSurvey) { //render other pages
      display = surveyPage;
    } else if (showDashboard) {
      display = dashboardPage;
    } else {
      display = welcomePage;
    }

    return (
      <div className="homepage-wrapper">
        {display}
      </div>
    );
  }
}
