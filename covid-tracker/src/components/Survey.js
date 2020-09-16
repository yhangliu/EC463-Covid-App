import React from "react";
import SurveyData from "./SurveyData.js"
import "../css/styleSurvey.css";
import firebase from "firebase";

export default class Survey extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userAnswer: null,    //current users answer
            currentIndex: 0,  //current questions index
            options: [],       //the options
            surveyEnd: false, //True if it's the last question
            score: 0,      //the Score
            disabled: true, // cant go next until answer is selected
            symptoms: [],
        }
    }

    loadQuiz = () => {
        const { currentIndex } = this.state;
        this.setState(() => {
            return {
                question: SurveyData[currentIndex].question,
                options: SurveyData[currentIndex].options,
                answer: SurveyData[currentIndex].answer
            }
        })
    }

    nextQuestionHandler = () => {
        const { userAnswer, answer, score, symptoms, currentIndex } = this.state

        if (userAnswer === answer) {
            this.setState({
                score: score + 1
            });
          //  console.log(score)
        }
        else {
            symptoms.push(SurveyData[currentIndex].symptom);
            this.setState({ 
                symptoms
            });
           // console.log(score)
        }

        this.setState({
            currentIndex: this.state.currentIndex + 1,
            disabled: true,
            userAnswer: null
        });

    }

    componentDidMount() {
        this.loadQuiz();
    }

    checkAnswer = answer => {
        this.setState({
            userAnswer: answer,
            disabled: false
        });
    }

    componentDidUpdate(prevProps, prevState) {
        const { currentIndex } = this.state;
        if (this.state.currentIndex !== prevState.currentIndex) {
            this.setState(() => {
                return {
                    question: SurveyData[currentIndex].question,
                    options: SurveyData[currentIndex].options,
                    answer: SurveyData[currentIndex].answer
                }
            });
        }
    }

    finishHandler = () => {
        const { symptoms, currentIndex, userAnswer, answer, score } = this.state;
        let newScore = score;
        if (currentIndex === SurveyData.length - 1) {
            if (userAnswer !== answer) {
                symptoms.push(SurveyData[currentIndex].symptom);
              //  console.log(score)
            } else {
                newScore = score + 1;
               // console.log(score)
            }
            this.setState({
                surveyEnd: true,
                symptoms,
                score: newScore
            })
        }

    }

    // writeSymptomsDataOnce() {
    //     const {symptomsName} = this.state;
    //     firebase.database().ref('symptoms').once('value', function(snapshot) {
    //         if (!snapshot.exists()) {
    //             for(let i = 0; i < symptomsName.length; i++) {
    //                 firebase.database().ref('symptoms/' + i).set({symptom_name: symptomsName[i]});
    //             }
    //             console.log("symptoms created");
    //         }
    //     });  
    // }

    writeUserSymptoms() {
        const {symptoms} = this.state;
        let date = {
            last_submitted: Date(Date.now())
        }
        firebase.database().ref("user_symptoms/").push({
            user_id: firebase.auth().currentUser.uid,
            symptoms: symptoms,
            date_submitted: date.last_submitted,
            name: firebase.auth().currentUser.displayName
        });

        firebase.database().ref('users').child(firebase.auth().currentUser.uid).update(date);
    }

    



    render() {
        const { question, options, currentIndex, userAnswer, surveyEnd, score } = this.state

        if (surveyEnd) {
            let message;
            if (score === 9) {
                message = "You have no symptoms! Continue practicing social distancing."
            } else if (score > 6 && score < 9) {
                message = "You are advised to quarantine for 14 days."
            } else {
                message = "Please contact your local hospital for help."
            }
            return ( 
                <div>
                    <h1> {message}  ids {this.state.symptoms} score {score} </h1>

                    <button onClick={() => {this.writeUserSymptoms(); this.props.submit();}}>Back to Home</button>

                </div>
            )
        }
        return (
            <div id="wrapper">
                <div id="main">
                    <div id="title">Symptom Tracker</div>
                    <div>
                        <h2>{question}</h2>
                        <span>{`Question ${currentIndex + 1} of ${SurveyData.length}`}</span>
                        {
                            options.map(option =>
                                <p key={option.id} className={`options ${userAnswer === option ? "selected" : null}`}
                                    onClick={() => this.checkAnswer(option)}
                                >
                                    {option}
                                </p>
                            )
                        }

                        {currentIndex < SurveyData.length - 1 &&
                            <button disabled={this.state.disabled} onClick={this.nextQuestionHandler}>
                                Next
            </button>}

                        {currentIndex === SurveyData.length - 1 &&
                            <button onClick={this.finishHandler}
                                disabled={this.state.disabled}>
                                Finish
            </button>}


                    </div>
                </div>
            </div>
        );
    }
}
