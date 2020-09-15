import React from "react";
import firebase from "firebase";
import User from "./User.js";

export default class Dashboard extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          usersByLatestSubmit: []   
      }

      this.readData();
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

    render() {
        let users = [];
        this.state.usersByLatestSubmit.forEach(user => {
            users.push(<User fullName={user.full_name} lastSubmitted={user.last_submitted} />);
        });

        return (
          <div className = "dashboard">
                <span>
                    <div className="user-list">
                        {users}
                    </div>
                    <button onClick={() => this.props.backToHome()}>Back to Home</button>
                </span>
          </div>
        );
      }
}