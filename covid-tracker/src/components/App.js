import React, { Component } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import HomePage from "./HomePage.js";
import "../css/App.css";
import firebase from "firebase";
import logo from '../bulogo.ico';
import bucampus from '../bucampus.jpg';


firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY, //hid firebase api
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
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
            <img src={bucampus} className="App-logo" alt="logo" />
      </div>
    );
  }
}
