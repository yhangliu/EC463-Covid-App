import React, { Component } from 'react';
import './App.css';
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import { Button } from 'react-bootstrap'


firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain:"covid-tracker-auth.firebaseapp.com"
})


class App extends Component {
  state={isSignedIn: false}
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({isSignedIn:!!user})
      console.log("user", user)
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Covid-Tracker</h1>
        {this.state.isSignedIn ? (
          <span>
          <div>Signed In!</div>
          <Button onClick={()=>firebase.auth().signOut()}>Sign Out!</Button>
          <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
          </span>
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

export default App;
