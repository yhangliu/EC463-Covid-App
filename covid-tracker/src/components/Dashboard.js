import React from "react";
import firebase from "firebase";


export default class Dashboard extends React.Component {
    constructor(props) {
      super(props);
    }

    render (){
        return(
            <div id = "wrapper">
                <div id = "main">
                    <div id = "title">Admin Dashboard</div>
                    <div>
                        <h2>hi</h2>
                    </div>
                </div>
            </div>
        );
    }
}