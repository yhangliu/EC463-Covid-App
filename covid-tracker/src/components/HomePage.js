import React from "react";
import Survey from "./Survey.js";
import { Button } from "react-bootstrap";
import firebase from "firebase";





async function get_data() {
    const url = "https://api.covidtracking.com/v1/states/MA/current.json?state=MA";
    const response = await fetch(url);
    const data = await response.json();
    //this.setState({date:data.date});
    this.setState({date: data.date,state: data.state, positive: data.positive, negative: data.negative, lastupdate: data.lastUpdateET})
    console.log(data.date);
}


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
