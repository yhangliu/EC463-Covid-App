import React, {Component} from "react";
import "./App.css";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import HomePage from "./HomePage.js";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY, //hid firebase api
  authDomain: "covid-tracker-auth.firebaseapp.com"
});

export default class App extends Component {
  state = {isSignedIn: false, showSurvey: false};
  uiConfig = {
    //ui for google and facebook login
    signInFlow: "popup", //sign in through pop up window
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({isSignedIn: !!user});
      console.log("user", user);
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Covid-Tracker</h1>
        {this.state.isSignedIn ? (
          <HomePage
            signOut={() => firebase.auth().signOut()}
            userName={firebase.auth().currentUser.displayName}
          />
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
      </div>
    );
  }
}
