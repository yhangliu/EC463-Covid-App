import React from "react";
import firebase from "firebase";
import User from "./User.js";
import DailySymptom from "./DailySymptom.js";
import "../css/dashboard.css"

export default class Dashboard extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          usersByLatestSubmit: [],
          dailySymptoms: {
              "fever": 0,
              "cough": 0,
              "difficulty breathing": 0,
              "sore throat": 0,
              "loss of senses": 0,
              "vomit/diarrhea": 0,
              "fatigue/nausea": 0,
              "muscle aches": 0,
              "congestion/runny nose": 0
          }
      }

      this.readData();
      this.readSymptoms();
    }
    
    async readData() {
        let {usersByLatestSubmit} = this.state;
        await firebase.database().ref('users').orderByChild('last_submitted').once('value', snapshot => {
            snapshot.forEach(function(child) {
                usersByLatestSubmit.push(child.val());
            });
        }); 
        this.setState({usersByLatestSubmit});
    }

    async readSymptoms () {
        let {dailySymptoms} = this.state;
        let temp = [];
        let before24Hours = new Date(Date.now()-(24*60*60*1000));
        console.log(before24Hours);
        await firebase.database().ref('user_symptoms').orderByChild('date_submitted').startAt(String(before24Hours)).once('value', snapshot => {
            console.log(snapshot.val());
            snapshot.forEach(function(child) {
                temp.push(child.val().symptoms);
            })
        });
        for (let i = 0; i < temp.length; i++) {
            if(temp[i] === undefined) {
                temp.splice(i,1);
            }
        }
        console.log(temp);

        for(var i = 0; i < temp.length; i++){
            for(var j = 0; j < temp[i].length; j++){
        
                dailySymptoms[temp[i][j]] += 1;
            }
        }
        console.log(dailySymptoms);
        this.setState({dailySymptoms});
    }

    render() {
        let users = [];
        this.state.usersByLatestSubmit.forEach(user => {
            users.push(<User fullName={user.full_name} lastSubmitted={user.last_submitted} />);
        });
        let symptomsToday = [];
        Object.keys(this.state.dailySymptoms).forEach(symptom => {
            symptomsToday.push(<DailySymptom symptom={symptom} count={this.state.dailySymptoms[symptom]} />);
        })

        return (
          <div className="dashboard">
                <div className="dashpage">
                    <div className="user-list">
                        <h1>Recent Users</h1>
                        {users}
                    </div>
                    <div className="daily-symptoms">
                        <h1>Daily Symptoms</h1>
                        {symptomsToday}
                    </div>
                </div>
                <button onClick={() => this.props.backToHome()}>Back to Home</button>
          </div>
        );
      }
}