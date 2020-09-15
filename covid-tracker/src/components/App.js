import React, { Component } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import HomePage from "./HomePage.js";
import "../css/App.css";
import firebase from "firebase";
import { getData } from '../api';
import Info from '../components/Stats/Info';


firebase.initializeApp({
    apiKey: 'AIzaSyAociAV4aHrPmX-5A6aBq5oFZBHJLtRtME', //hid firebase api
    authDomain: 'covid-tracker-auth.firebaseapp.com',
    databaseURL: 'https://covid-tracker-auth.firebaseio.com',
    projectId: 'covid-tracker-auth',
    storageBucket: 'gs://covid-tracker-auth.appspot.com',
    messagingSenderId: '538414367722'
});




export default class App extends Component {
  constructor(props) {
      super(props);

      this.state = {
          isSignedIn: false, showSurvey: false };
    this.uiConfig = {
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
    }

    async componentDidMount () {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user });
    });
  };

    render() {
    return (
      <div className="App">
        <h1>Covid-Tracker</h1>
        {this.state.isSignedIn ? (
          <HomePage/>
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
